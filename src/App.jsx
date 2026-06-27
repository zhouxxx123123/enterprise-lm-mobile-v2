import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  BookmarkSimple,
  Books,
  CaretDown,
  CaretLeft,
  CaretRight,
  CheckCircle,
  ClipboardText,
  Copy,
  DeviceMobile,
  DotsThree,
  Exam,
  FilePdf,
  Files,
  Flag,
  Headphones,
  House,
  Info,
  ListBullets,
  MagnifyingGlass,
  Microphone,
  NotePencil,
  Plus,
  Question,
  SealWarning,
  ShareNetwork,
  ShieldCheck,
  SignOut,
  Sparkle,
  Stack,
  Star,
  ThumbsDown,
  ThumbsUp,
  UploadSimple,
  UserCircle,
  WarningCircle,
  X,
} from "@phosphor-icons/react";

const spaces = [
  {
    id: "onboarding",
    name: "新员工入职培训",
    type: "课程",
    source: "企业",
    status: "必学 · 今日截止",
    progress: 68,
    sources: 12,
    read: 8,
    review: 3,
    updated: "今天 09:10",
    hint: "继续第 4 章“门店接待流程”",
    accent: "teal",
  },
  {
    id: "product",
    name: "全屋定制产品知识库",
    type: "资料",
    source: "企业",
    status: "进行中",
    progress: 42,
    sources: 18,
    read: 7,
    review: 2,
    updated: "昨天 18:30",
    hint: "有 2 个资料已更新",
    accent: "blue",
  },
  {
    id: "promo",
    name: "618 活动话术专题",
    type: "专题",
    source: "企业",
    status: "新下发",
    progress: 15,
    sources: 7,
    read: 1,
    review: 0,
    updated: "今天 07:50",
    hint: "活动政策有更新",
    accent: "amber",
  },
  {
    id: "mine",
    name: "我的竞品资料整理",
    type: "资料",
    source: "我的",
    status: "个人空间",
    progress: null,
    sources: 5,
    read: 5,
    review: 1,
    updated: "今天 10:02",
    hint: "个人资料，仅本人可见",
    accent: "violet",
  },
  {
    id: "blocked",
    name: "售后投诉处理案例库",
    type: "资料",
    source: "企业",
    status: "权限已变更",
    progress: null,
    sources: 9,
    read: 0,
    review: 0,
    updated: "6月20日",
    hint: "权限不可用",
    disabled: true,
    accent: "gray",
  },
];

const resources = [
  {
    title: "2026 全屋定制产品手册.pdf",
    type: "PDF",
    source: "企业",
    status: "已可提问",
    permission: "可查看，不可下载",
  },
  {
    title: "板材与环保等级说明.pdf",
    type: "PDF",
    source: "企业",
    status: "已可提问",
    permission: "可查看，可下载",
  },
  {
    title: "五金系统选型指南.pdf",
    type: "PDF",
    source: "企业",
    status: "解析中",
    permission: "可查看，不可下载",
  },
  {
    title: "售后投诉处理案例库",
    type: "文档",
    source: "企业",
    status: "权限已变更",
    permission: "不可访问",
    disabled: true,
  },
];

const plusActions = [
  { label: "添加来源", icon: Files, kind: "source" },
  { label: "总结", icon: ListBullets, kind: "summary" },
  { label: "学习指南", icon: Books, kind: "guide" },
  { label: "自测", icon: CheckCircle, kind: "quiz" },
  { label: "知识卡", icon: ClipboardText, kind: "card" },
  { label: "音频导学", icon: Headphones, kind: "audio" },
  { label: "FAQ", icon: Question, kind: "faq" },
  { label: "思维导图", icon: ShareNetwork, kind: "mindmap" },
];

const resumeCardsByFilter = {
  全部: [
    {
      space: "新员工入职培训",
      title: "继续第 4 章",
      note: "剩余 12 分钟",
      tone: "teal",
    },
    {
      space: "产品知识库",
      title: "板材环保等级",
      note: "2 个资料已更新",
      tone: "muted",
    },
  ],
  课程: [
    {
      space: "新员工入职培训",
      title: "门店接待流程",
      note: "第 4 章 · 剩余 12 分钟",
      tone: "teal",
    },
    {
      space: "服务标准",
      title: "常见异议处理",
      note: "第 5 章 · 待学习",
      tone: "muted",
    },
  ],
  资料: [
    {
      space: "全屋定制产品知识库",
      title: "板材环保等级",
      note: "2 个资料已更新",
      tone: "blue",
    },
    {
      space: "我的竞品资料整理",
      title: "环保等级网页",
      note: "个人资料 · 同步中",
      tone: "muted",
    },
  ],
  专题: [
    {
      space: "618 活动话术专题",
      title: "活动政策说明",
      note: "新下发 · 已读 1/7",
      tone: "amber",
    },
    {
      space: "高意向客户跟进",
      title: "价格敏感异议",
      note: "推荐学习 · 8 分钟",
      tone: "muted",
    },
  ],
};

const generatedMap = {
  source: {
    title: "添加来源",
    body: "支持上传 PDF、文档、图片、音频或网页链接。个人上传内容默认进入个人区域，管理员可筛选转为企业正式资料。",
    cta: "进入上传",
  },
  summary: {
    title: "板材环保等级 3 分钟总结",
    body: "E0 与 ENF 都是环保释放量相关表达。销售解释时先讲标准，再落到儿童房、老人房等敏感场景。",
    cta: "查看完整总结",
  },
  guide: {
    title: "全屋定制产品学习指南",
    body: "建议先读产品手册，再读环保等级说明，最后用自测确认是否能把专业术语转成客户语言。",
    cta: "查看学习指南",
  },
  quiz: {
    title: "环保等级自测 10 题",
    body: "已生成个人自测，不进入正式成绩。错题会进入待复习，并可被后台统计为候选考核点。",
    cta: "开始自测",
  },
  card: {
    title: "知识卡：ENF 级板材",
    body: "适合对儿童房、老人房、长期居住健康更敏感的客户。沟通重点是“更严格的释放量要求”。",
    cta: "查看知识卡",
  },
  audio: {
    title: "音频导学已生成",
    body: "预计 3 分钟，按“概念解释、客户场景、推荐话术”三段播放。",
    cta: "播放导学",
  },
  faq: {
    title: "客户常见问题 FAQ",
    body: "已生成 6 个问答，包括“为什么 ENF 更贵”“儿童房是否必须选 ENF”等。",
    cta: "查看 FAQ",
  },
  mindmap: {
    title: "环保等级思维导图",
    body: "已按“标准解释、适用场景、客户话术、注意事项”生成结构。",
    cta: "查看思维导图",
  },
};

const practiceTasks = [
  {
    id: "practice-task-entry",
    title: "完成《调研归档管理》PPT 陪练",
    summary: "按 3 页 PPT 逐页讲解入口价值、操作路径和边界。",
    duration: "3 页 · 预计 8 分钟",
    due: "今日 18:00",
    status: "进行中",
    result: "上次完成到第 1 页",
    sessionKey: "entry-talk",
  },
  {
    id: "practice-task-boundary",
    title: "需求评估边界说明练习",
    summary: "说明为什么需求评估要独立入口，手机端只做轻确认。",
    duration: "1 页 · 预计 3 分钟",
    due: "本周五",
    status: "待完成",
    result: "未开始",
    sessionKey: "boundary-talk",
  },
  {
    id: "practice-task-training",
    title: "医生培训开场讲解练习",
    summary: "练习医生培训开场话术和价值承接。",
    duration: "1 页 · 预计 3 分钟",
    due: "昨日 19:00",
    status: "待完成",
    result: "已逾期",
    sessionKey: "doctor-opening",
  },
];

const practiceCategories = [
  {
    id: "product",
    title: "产品讲解",
    summary: "康宸产品核心功能与调研归档管理入口讲解练习",
    topics: [
      {
        id: "practice-topic-entry",
        title: "调研归档管理入口讲解",
        summary: "先讲现场入口价值，再讲三件核心事。",
        sessionKey: "entry-talk",
      },
      {
        id: "practice-topic-boundary",
        title: "需求评估边界说明",
        summary: "解释为什么需求评估独立存在，手机端只做轻确认。",
        sessionKey: "boundary-talk",
      },
    ],
  },
  {
    id: "qa",
    title: "现场答疑",
    summary: "客户现场问题的稳妥回答与沟通技巧练习",
    topics: [
      {
        id: "practice-topic-answer",
        title: "现场答疑稳妥回答",
        summary: "把专业表达转成客户能听懂的生活场景。",
        sessionKey: "onsite-answer",
      },
    ],
  },
  {
    id: "doctor",
    title: "医生培训",
    summary: "医生端培训开场与关键话术练习",
    topics: [
      {
        id: "practice-topic-doctor",
        title: "医生培训开场讲解",
        summary: "先交代培训目的，再落到医生收益和操作路径。",
        sessionKey: "doctor-opening",
      },
    ],
  },
];

const practiceSessions = {
  "entry-talk": {
    title: "完成《调研归档管理》PPT 陪练",
    progressLabel: "第 1 页 / 题 · 已完成 0/3",
    stepLabel: "1/3",
    scene: "产品讲解",
    type: "PPT 讲解",
    score: 30,
    text: "请按这一页 PPT，向客户讲解“调研归档管理”入口到底解决什么问题。",
    slide: {
      title: "调研归档管理",
      bullets: ["新建调研", "查看调研归档", "生成需求记录"],
    },
    reference:
      "建议顺序：先说这是现场入口，再讲三件核心事，最后强调它不承接复杂后台管理。",
    advice: [
      "先讲“现场为什么要有它”，不要一上来背功能名。",
      "讲完三件事后，补一句“复杂审批不在手机里做”。",
    ],
    scoreFocus: [
      "有没有先讲价值",
      "有没有把三件核心事讲全",
      "有没有把边界说稳",
    ],
    transcriptSample: [
      "这页先讲的是调研归档管理为什么是现场入口。",
      "它把新建调研、调研归档和需求记录放到一处。",
      "现场人员最重要的是快速开始、快速回看，不是做复杂后台管理。",
    ],
    pages: [
      {
        id: "entry-page-1",
        text: "请按这一页 PPT，向客户讲解“调研归档管理”入口到底解决什么问题。",
        slide: {
          title: "调研归档管理",
          bullets: ["新建调研", "查看调研归档", "生成需求记录"],
          pageLabel: "1/3",
          footer: "现场入口 · 流程讲解",
        },
        reference:
          "建议顺序：先说这是现场入口，再讲三件核心事，最后强调它不承接复杂后台管理。",
        advice: [
          "先讲“现场为什么要有它”，不要一上来背功能名。",
          "讲完三件事后，补一句“复杂审批不在手机里做”。",
        ],
        scoreFocus: [
          "有没有先讲价值",
          "有没有把三件核心事讲全",
          "有没有把边界说稳",
        ],
        transcriptSample: [
          "这页先讲的是调研归档管理为什么是现场入口。",
          "它把新建调研、调研归档和需求记录放到一处。",
          "现场人员最重要的是快速开始、快速回看，不是做复杂后台管理。",
        ],
      },
      {
        id: "entry-page-2",
        text: "请按这一页 PPT，向客户讲清楚现场人员进入后第一步应该怎么做。",
        slide: {
          title: "现场先关联项目",
          bullets: ["选择客户或项目", "确认调研对象", "开始本次调研"],
          pageLabel: "2/3",
          footer: "第一步 · 防止记录散落",
        },
        reference:
          "建议先讲为什么要先关联项目，再讲关联后所有录音、照片和需求记录都会归到同一条线索下。",
        advice: [
          "不要直接跳到录音，要先解释“先关联项目”的必要性。",
          "把价值说成客户能懂的“后面不会找不到记录”。",
        ],
        scoreFocus: [
          "有没有讲清第一步",
          "有没有说明关联项目的价值",
          "有没有避免只背操作按钮",
        ],
        transcriptSample: [
          "进入调研归档后，第一步不是马上录音，而是先关联客户或项目。",
          "这样后面的调研录音、图片和需求记录都会归到同一个项目下。",
        ],
      },
      {
        id: "entry-page-3",
        text: "请按这一页 PPT，向客户说明调研归档管理和复杂后台管理的边界。",
        slide: {
          title: "手机端只做现场闭环",
          bullets: ["现场采集", "快速回看", "生成需求记录"],
          pageLabel: "3/3",
          footer: "边界说明 · 后台承接复杂管理",
        },
        reference:
          "建议强调手机端负责现场闭环，复杂审批、排班、统计和后台管理仍然回到管理后台处理。",
        advice: [
          "边界要说清楚，不要让客户误以为手机端承接所有后台功能。",
          "用“现场闭环”和“后台管理”两个层次做区分。",
        ],
        scoreFocus: [
          "有没有讲清手机端边界",
          "有没有说明后台继续承接复杂管理",
          "有没有用客户能理解的话收束价值",
        ],
        transcriptSample: [
          "手机端这一块主要解决现场闭环，也就是采集、回看和生成需求记录。",
          "更复杂的审批、统计和后台管理，仍然放在管理后台里处理。",
        ],
      },
    ],
  },
  "boundary-talk": {
    title: "需求评估边界说明练习",
    progressLabel: "第 1 页 / 题 · 已完成 0/1",
    stepLabel: "1/1",
    scene: "产品讲解",
    type: "主观题",
    score: 25,
    text: "请说明“需求评估”为什么要独立入口，并解释移动端为什么只做轻确认。",
    reference:
      "建议先解释阶段边界，再讲移动端的轻量价值，最后补一句复杂评估在 PC 端完成。",
    advice: [
      "明确“调研”和“需求评估”是两个不同阶段。",
      "手机端强调确认、回看和跟进，不做复杂评估和审批。",
    ],
    scoreFocus: ["有没有讲清独立入口的原因", "有没有讲清手机端边界"],
    transcriptSample: [
      "需求评估和调研是两个阶段，所以必须独立入口。",
      "现场人员在手机上只做轻确认，复杂评估和审批仍然放在后台。",
    ],
  },
  "onsite-answer": {
    title: "现场答疑稳妥回答",
    progressLabel: "第 1 页 / 题 · 已完成 0/1",
    stepLabel: "1/1",
    scene: "现场答疑",
    type: "情景问答",
    score: 20,
    text: "客户追问：为什么录音结束后不能立刻看到需求记录？请给出稳妥解释。",
    reference:
      "建议表达：AI 需要先整理录音内容，通常在几分钟内生成，生成后会提示查看。",
    advice: [
      "不要说“系统在跑”，要说“AI 正在整理录音内容”。",
      "给出明确时间预期，降低客户焦虑。",
    ],
    scoreFocus: ["是否给了时间预期", "是否用客户能听懂的话解释清楚"],
    transcriptSample: [
      "录音结束后，AI 需要先整理内容，再生成需求记录。",
      "一般几分钟内就会生成，生成后系统会提示您查看。",
    ],
  },
  "doctor-opening": {
    title: "医生培训开场讲解练习",
    progressLabel: "第 1 页 / 题 · 已完成 0/1",
    stepLabel: "1/1",
    scene: "医生培训",
    type: "主观题",
    score: 20,
    text: "向医生介绍康宸系统时，如何开场才能快速建立信任感？",
    reference:
      "开场先说明培训目标，再讲系统对医生工作的帮助，避免一上来堆技术细节。",
    advice: [
      "先讲对医生的直接价值，再讲操作步骤。",
      "用“减少重复记录、减少沟通成本”这类医生熟悉的收益点切入。",
    ],
    scoreFocus: ["是否先讲价值", "是否用了医生熟悉的场景"],
    transcriptSample: [
      "今天这次培训的目标，是让您更快完成现场记录和后续回看。",
      "系统会把调研和需求记录串起来，减少重复沟通和重复登记。",
    ],
  },
};

const examFilters = ["待考", "进行中", "已完成"];

const examItems = [
  {
    id: "exam-survey-weekly",
    title: "移动端调研流程周测",
    questionCount: 3,
    duration: "12 分钟",
    status: "待考",
    category: "调研流程",
    due: "今日 22:00",
    attemptsLeft: 2,
  },
  {
    id: "exam-doctor-scene",
    title: "医生培训场景考核",
    questionCount: 4,
    duration: "15 分钟",
    status: "进行中",
    category: "医生培训",
    due: "本周五 18:00",
    attemptsLeft: 1,
  },
  {
    id: "exam-onsite-finished",
    title: "现场答疑表达月考",
    questionCount: 4,
    duration: "10 分钟",
    status: "已完成",
    category: "现场答疑",
    due: "最近一次 08:41",
    attemptsLeft: 0,
  },
];

const examQuestions = [
  {
    id: "q1",
    type: "present",
    label: "PPT 讲解",
    text: "请基于下方 PPT 页面，向客户讲清楚“调研归档管理”入口的现场价值。",
    slide: {
      title: "调研归档管理",
      bullets: ["新建调研", "查看调研归档", "生成需求记录"],
    },
    transcriptSample: [
      "这一页先讲的是调研归档管理为什么是现场入口。",
      "到了医院现场，要先把项目关联上，再去开始调研。",
    ],
  },
  {
    id: "q2",
    type: "single",
    label: "单选题",
    text: "现场调研时，以下哪个操作是正确的第一步？",
    options: [
      "直接开始录音",
      "先关联项目，再开始调研",
      "先生成需求记录",
      "先查看历史记录",
    ],
  },
  {
    id: "q3",
    type: "speech",
    label: "演讲题",
    text: "请用 60 秒向客户解释 E0 和 ENF 的区别。",
    hint: "先讲共同点，再讲 ENF 更严格，最后落到儿童房等敏感场景。",
    transcriptSample: [
      "E0 和 ENF 都和环保释放量相关，但 ENF 的要求更严格。",
      "如果客户更在意儿童房、老人房或长期居住健康，ENF 的解释会更有说服力。",
    ],
  },
];

const profileAssetGroups = [
  {
    key: "materials",
    title: "个人资料",
    count: 5,
    status: "1 个 AI暂不可用 · 1 个已转正式",
    icon: UserCircle,
    screen: "profile-materials",
  },
  {
    key: "generated",
    title: "生成内容",
    count: 12,
    status: "2 个已转正式 · 1 个来源不可访问",
    icon: Sparkle,
    screen: "profile-generated",
  },
  {
    key: "history",
    title: "问答历史",
    count: 34,
    status: "1 条来源不可访问 · 1 条已转正式",
    icon: NotePencil,
    screen: "profile-history",
  },
  {
    key: "quiz",
    title: "自测记录",
    count: 9,
    status: "3 条待复习",
    icon: CheckCircle,
    screen: "profile-self-tests",
  },
  {
    key: "saved",
    title: "收藏资料",
    count: 8,
    status: "2 个课程 · 5 个企业资料 · 1 个网页",
    icon: BookmarkSimple,
    screen: "profile-saved",
  },
  {
    key: "downloads",
    title: "下载内容",
    count: 6,
    status: "1 个权限已变更",
    icon: Files,
    screen: "profile-downloads",
  },
  {
    key: "adoption",
    title: "建议采纳记录",
    count: 3,
    status: "1 条处理中 · 1 条已采纳",
    icon: Flag,
    screen: "profile-adoptions",
  },
];

const reviewItems = [
  {
    id: "review-1",
    title: "ENF 级环保标准解释不完整",
    source: "企业LM自测",
    space: "全屋定制产品知识库",
    point: "环保等级说明",
    action: "重看《板材与环保等级说明》",
    updated: "今天 09:48",
    status: "待处理",
  },
  {
    id: "review-2",
    title: "价格异议回应缺少活动边界",
    source: "陪练表现不足",
    space: "618 活动话术专题",
    point: "价格敏感客户异议处理",
    action: "完成“价格敏感客户跟进”陪练",
    updated: "今天 19:18",
    status: "待处理",
  },
  {
    id: "review-3",
    title: "门店接待流程第 3 步漏说",
    source: "考试错题",
    space: "新员工入职培训",
    point: "门店接待流程",
    action: "回看第 4 章并加入待复习",
    updated: "今天 18:06",
    status: "高优先级",
  },
  {
    id: "review-4",
    title: "五金系统关键词卡建议复习",
    source: "知识卡复习建议",
    space: "全屋定制产品知识库",
    point: "五金系统关键词",
    action: "再刷 1 轮知识卡",
    updated: "昨天 20:22",
    status: "待处理",
  },
  {
    id: "review-5",
    title: "环保材料章节停留时间偏短",
    source: "学习行为形成",
    space: "新员工入职培训",
    point: "环保材料基础认知",
    action: "补看《环保等级说明》并继续提问",
    updated: "昨天 09:14",
    status: "建议查看",
  },
];

const personalMaterials = [
  {
    id: "material-1",
    title: "竞品套餐对比截图",
    kind: "图片",
    icon: Files,
    scope: "我的竞品资料整理",
    scopeType: "个人学习空间",
    updated: "今天 10:02",
    status: "仅自己可见",
  },
  {
    id: "material-2",
    title: "客户提到的三类价格问题",
    kind: "粘贴文本",
    icon: ClipboardText,
    scope: "我的竞品资料整理",
    scopeType: "个人学习空间",
    updated: "今天 09:57",
    status: "仅自己可见",
  },
  {
    id: "material-3",
    title: "个人整理：门店成交问答.txt",
    kind: "TXT",
    icon: NotePencil,
    scope: "我的竞品资料整理",
    scopeType: "个人学习空间",
    updated: "昨天 21:10",
    status: "已转正式",
  },
  {
    id: "material-4",
    title: "某品牌环保等级说明网页",
    kind: "网页链接",
    icon: Info,
    scope: "我的竞品资料整理",
    scopeType: "个人学习空间",
    updated: "今天 08:45",
    status: "解析中",
  },
  {
    id: "material-5",
    title: "周末客户沟通录音.m4a",
    kind: "音频",
    icon: Headphones,
    scope: "高意向客户接待",
    scopeType: "企业学习空间补充",
    updated: "6月23日 20:18",
    status: "AI暂不可用",
  },
];

const selfTestItems = [
  {
    id: "self-test-1",
    title: "环保等级自测结果",
    origin: "个人自测",
    scope: "板材与环保等级说明.pdf",
    summary: "10 题 · 正确率 70% · 3 条待复习",
    updated: "今天 09:48",
    status: "待复习",
  },
  {
    id: "self-test-2",
    title: "新员工第 4 章章节自测",
    origin: "管理员下发",
    scope: "新员工入职培训 / 第 4 章",
    summary: "8 题 · 正确率 87% · 已完成",
    updated: "昨天 17:38",
    status: "正常",
  },
  {
    id: "self-test-3",
    title: "价格敏感客户 FAQ 候选题",
    origin: "个人自测",
    scope: "618 活动话术专题",
    summary: "6 题 · 其中 2 题已建议采纳",
    updated: "6月23日 19:46",
    status: "已建议采纳",
  },
  {
    id: "self-test-4",
    title: "投诉安抚话术复盘自测",
    origin: "管理员下发",
    scope: "售后投诉处理案例库",
    summary: "5 题 · 来源权限失效后仅保留记录",
    updated: "6月22日 10:31",
    status: "来源不可访问",
  },
];

const questionHistoryItems = [
  {
    id: "history-1",
    title: "E0 级和 ENF 级板材怎么给客户解释？",
    scope: "全屋定制产品知识库 / 板材与环保等级说明.pdf",
    scopeType: "资料或章节",
    updated: "今天 09:40",
    status: "正常",
  },
  {
    id: "history-2",
    title: "另一家套餐比我们便宜 15%，我第一句话应该怎么接？",
    scope: "我的竞品资料整理 / 个人整理：门店成交问答.txt",
    scopeType: "私有原件",
    updated: "今天 10:21",
    status: "仅自己可见",
  },
  {
    id: "history-3",
    title: "上次售后投诉案例里，客户对安装延期最在意什么？",
    scope: "售后投诉处理案例库",
    scopeType: "学习空间",
    updated: "昨天 16:18",
    status: "来源不可访问",
  },
  {
    id: "history-4",
    title: "门店成交时先报价还是先问需求？",
    scope: "我的竞品资料整理 / 个人整理：门店成交问答.txt",
    scopeType: "私有原件",
    updated: "6月23日 21:26",
    status: "已转正式",
  },
];

const generatedItems = [
  {
    id: "generated-1",
    title: "板材环保等级 3 分钟总结",
    kind: "总结",
    scope: "全屋定制产品知识库",
    updated: "今天 09:42",
    status: "正常",
  },
  {
    id: "generated-2",
    title: "新员工第 4 章学习指南",
    kind: "学习指南",
    scope: "新员工入职培训 / 第 4 章",
    updated: "昨天 17:10",
    status: "正常",
  },
  {
    id: "generated-3",
    title: "环保等级自测 10 题",
    kind: "自测",
    scope: "板材与环保等级说明.pdf",
    updated: "今天 09:48",
    status: "仅自己可见",
  },
  {
    id: "generated-4",
    title: "价格敏感客户 FAQ",
    kind: "FAQ",
    scope: "618 活动话术专题",
    updated: "6月23日 19:30",
    status: "已转正式",
  },
  {
    id: "generated-5",
    title: "618 活动政策音频导学",
    kind: "音频导学",
    scope: "618 活动话术专题",
    updated: "6月23日 18:42",
    status: "已下载",
  },
  {
    id: "generated-6",
    title: "安装延期安抚话术思维导图",
    kind: "思维导图",
    scope: "售后投诉处理案例库",
    updated: "6月22日 14:05",
    status: "来源不可访问",
  },
];

const savedItems = [
  {
    id: "saved-1",
    title: "板材与环保等级说明.pdf",
    kind: "企业资料",
    icon: FilePdf,
    scope: "全屋定制产品知识库",
    updated: "今天 09:42",
    status: "企业资料",
  },
  {
    id: "saved-2",
    title: "新员工第 4 章：门店接待流程",
    kind: "课程",
    icon: Books,
    scope: "新员工入职培训",
    updated: "昨天 17:10",
    status: "课程",
  },
  {
    id: "saved-3",
    title: "某品牌环保等级说明网页",
    kind: "网页",
    icon: Info,
    scope: "我的竞品资料整理",
    updated: "今天 08:45",
    status: "网页",
  },
  {
    id: "saved-4",
    title: "价格敏感客户 FAQ",
    kind: "企业资料",
    icon: Files,
    scope: "618 活动话术专题",
    updated: "6月23日 19:30",
    status: "企业资料",
  },
  {
    id: "saved-5",
    title: "售后投诉处理案例库",
    kind: "企业资料",
    icon: Books,
    scope: "售后投诉处理案例库",
    updated: "6月22日 10:30",
    status: "来源不可访问",
  },
];

const downloadItems = [
  {
    id: "download-1",
    title: "618 活动政策音频导学",
    size: "8.6 MB",
    updated: "今天 07:35",
    status: "可离线",
  },
  {
    id: "download-2",
    title: "板材与环保等级说明.pdf",
    size: "12.4 MB",
    updated: "昨天 18:06",
    status: "可离线",
  },
  {
    id: "download-3",
    title: "新员工第 4 章学习指南",
    size: "420 KB",
    updated: "昨天 17:12",
    status: "可离线",
  },
  {
    id: "download-4",
    title: "售后投诉处理案例库",
    size: "4.1 MB",
    updated: "6月22日 10:30",
    status: "权限已变更",
  },
  {
    id: "download-5",
    title: "高意向客户接待音频导学",
    size: "9.2 MB",
    updated: "6月21日 21:14",
    status: "下载失败",
  },
];

const adoptionItems = [
  {
    id: "adoption-1",
    title: "岩板台面保养说明",
    type: "个人资料",
    scope: "我的竞品资料整理 / 个人整理：门店成交问答.txt",
    summary: "已进入企业正式资料候选",
    updated: "今天 14:12",
    status: "已采纳",
  },
  {
    id: "adoption-2",
    title: "另一家套餐便宜 15% 时怎么回应",
    type: "AI回答",
    scope: "问答历史 / 私有原件对话",
    summary: "管理员正在复核表达是否可作为企业标准话术",
    updated: "今天 10:26",
    status: "处理中",
  },
  {
    id: "adoption-3",
    title: "环保等级自测候选题第 4 题",
    type: "自测候选",
    scope: "环保等级自测 10 题",
    summary: "建议保留情境，但需要改成企业统一题干",
    updated: "昨天 20:08",
    status: "未采纳",
  },
  {
    id: "adoption-4",
    title: "价格敏感客户 FAQ",
    type: "生成内容",
    scope: "618 活动话术专题",
    summary: "已提交，等待管理员判断是否转正式",
    updated: "6月23日 19:32",
    status: "已提交",
  },
];

const messageItems = [
  {
    id: "message-1",
    type: "考试",
    title: "新品知识考试今晚 20:00 截止",
    summary: "还剩 1 道演讲题未完成",
    updated: "今天 18:06",
    unread: true,
    target: "exam-intro",
  },
  {
    id: "message-2",
    type: "陪练",
    title: "高意向客户接待报告已生成",
    summary: "可查看本次表现建议与待复习项",
    updated: "今天 19:18",
    unread: true,
    target: "practice-report",
  },
  {
    id: "message-3",
    type: "待复习",
    title: "你有 3 项待复习需要处理",
    summary: "来自全屋定制产品知识库与 618 活动话术专题",
    updated: "今天 19:26",
    unread: false,
    target: "profile-reviews",
  },
  {
    id: "message-4",
    type: "采纳反馈",
    title: "你的“岩板台面保养说明”已采纳",
    summary: "已进入企业正式资料候选",
    updated: "今天 14:12",
    unread: true,
    target: "profile-adoptions",
  },
  {
    id: "message-5",
    type: "权限与下载",
    title: "售后投诉处理案例库权限已变更",
    summary: "已下载文件不可继续打开",
    updated: "今天 11:03",
    unread: false,
    target: "profile-downloads",
  },
  {
    id: "message-6",
    type: "学习",
    title: "新员工入职培训第 4 章已更新",
    summary: "门店接待流程新增 2 个注意点",
    updated: "今天 09:15",
    unread: false,
    target: "detail",
  },
];

const getPracticeCategory = (categoryId) =>
  practiceCategories.find((category) => category.id === categoryId) ?? practiceCategories[0];

const getPracticeSession = (sessionKey) =>
  practiceSessions[sessionKey] ?? practiceSessions["entry-talk"];

const getExamItem = (examId) =>
  examItems.find((item) => item.id === examId) ?? examItems[0];

const getInitialPrototypeState = () => {
  const defaults = {
    screen: "home",
    practiceCategoryId: practiceCategories[0].id,
    practiceSessionKey: practiceTasks[0].sessionKey,
    selectedExamId: examItems[0].id,
  };

  if (typeof window === "undefined") return defaults;

  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");
  const practiceCategoryId = params.get("practiceCategory");
  const practiceSessionKey = params.get("practiceSession");
  const selectedExamId = params.get("examId");
  const validScreens = new Set([
    "workbench",
    "home",
    "detail",
    "chat",
    "practice",
    "practice-detail",
    "practice-session",
    "practice-report",
    "exam",
    "exam-verify",
    "exam-intro",
    "exam-taking",
    "exam-report",
  ]);

  return {
    screen: validScreens.has(screen) ? screen : defaults.screen,
    practiceCategoryId: practiceCategories.some((item) => item.id === practiceCategoryId)
      ? practiceCategoryId
      : defaults.practiceCategoryId,
    practiceSessionKey: practiceSessions[practiceSessionKey]
      ? practiceSessionKey
      : defaults.practiceSessionKey,
    selectedExamId: examItems.some((item) => item.id === selectedExamId)
      ? selectedExamId
      : defaults.selectedExamId,
  };
};

const tabForScreen = (screen, profileOriginTab = "企业LM") => {
  if (screen.startsWith("profile-")) return profileOriginTab;
  if (["home", "detail", "chat"].includes(screen)) return "企业LM";
  if (["practice", "practice-detail", "practice-role", "practice-session", "practice-report"].includes(screen)) return "陪练";
  if (["exam", "exam-verify", "exam-intro", "exam-taking", "exam-report"].includes(screen)) return "考试";
  return "内训工作台";
};

export function App() {
  const initialState = useMemo(() => getInitialPrototypeState(), []);
  const [screen, setScreen] = useState(initialState.screen);
  const [filter, setFilter] = useState("全部");
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [toast, setToast] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileOriginTab, setProfileOriginTab] = useState("企业LM");
  const [sourcePanel, setSourcePanel] = useState(false);
  const [practiceCategoryId, setPracticeCategoryId] = useState(initialState.practiceCategoryId);
  const [practiceSessionKey, setPracticeSessionKey] = useState(initialState.practiceSessionKey);
  const [practiceReturnScreen, setPracticeReturnScreen] = useState("practice");
  const [selectedExamId, setSelectedExamId] = useState(initialState.selectedExamId);
  const [examDrafts, setExamDrafts] = useState({});

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const typeMatches = filter === "全部" || space.type === filter;
      const queryMatches = !query || space.name.includes(query) || space.hint.includes(query);
      return typeMatches && queryMatches;
    });
  }, [filter, query]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__enterpriseLmToast);
    window.__enterpriseLmToast = window.setTimeout(() => setToast(""), 2200);
  };

  const goChat = () => {
    setScreen("chat");
    setIsMenuOpen(false);
  };

  const openProfileDrawer = () => {
    setProfileOriginTab(tabForScreen(screen, profileOriginTab));
    setProfileOpen(true);
  };

  const openProfileScreen = (nextScreen) => {
    setProfileOpen(false);
    setSourcePanel(false);
    setScreen(nextScreen);
  };

  const backToProfileDrawer = () => {
    const screenByTab = {
      企业LM: "home",
      内训工作台: "workbench",
      陪练: "practice",
      考试: "exam",
    };

    setScreen(screenByTab[profileOriginTab] ?? "home");
    setProfileOpen(true);
  };

  const hideBottomTabs = ["chat", "practice-detail", "practice-session", "exam-verify", "exam-intro", "exam-taking"].includes(screen);

  const switchTab = (tab) => {
    setProfileOpen(false);
    setSourcePanel(false);
    setToast("");
    setGenerated(null);
    setIsMenuOpen(false);

    const nextScreen = {
      内训工作台: "workbench",
      企业LM: "home",
      陪练: "practice",
      考试: "exam",
    }[tab];

    setScreen(nextScreen || "home");
  };

  return (
    <main className="app-shell">
      <section className={`phone-screen screen-${screen}`}>
        {screen === "workbench" && (
          <WorkbenchScreen
            onProfile={openProfileDrawer}
            onEnterpriseLm={() => setScreen("home")}
            onPractice={() => setScreen("practice")}
            onExam={() => setScreen("exam")}
            onToast={showToast}
          />
        )}

        {screen === "home" && (
          <HomeScreen
            filter={filter}
            setFilter={setFilter}
            query={query}
            setQuery={setQuery}
            spaces={filteredSpaces}
            onOpenDetail={() => setScreen("detail")}
            onOpenChat={goChat}
            onProfile={openProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "detail" && (
          <DetailScreen
            onBack={() => setScreen("home")}
            onChat={goChat}
            onSourcePanel={() => setSourcePanel(true)}
            onToast={showToast}
          />
        )}

        {screen === "chat" && (
          <ChatScreen
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            generated={generated}
            onBack={() => setScreen("detail")}
            onGenerate={(kind) => {
              setGenerated(generatedMap[kind]);
              setIsMenuOpen(false);
              showToast(`${generatedMap[kind].title}已生成`);
            }}
            onToast={showToast}
          />
        )}

        {screen === "practice" && (
          <PracticeScreen
            onOpenTask={(sessionKey) => {
              setPracticeSessionKey(sessionKey);
              setPracticeReturnScreen("practice");
              setScreen("practice-session");
            }}
            onOpenCategory={(categoryId) => {
              setPracticeCategoryId(categoryId);
              setScreen("practice-detail");
            }}
            onReport={() => setScreen("practice-report")}
            onToast={showToast}
          />
        )}

        {screen === "practice-detail" && (
          <PracticeDetailScreen
            category={getPracticeCategory(practiceCategoryId)}
            onBack={() => setScreen("practice")}
            onOpenTopic={(sessionKey) => {
              setPracticeSessionKey(sessionKey);
              setPracticeReturnScreen("practice-detail");
              setScreen("practice-session");
            }}
          />
        )}

        {screen === "practice-session" && (
          <PracticeSessionScreen
            session={getPracticeSession(practiceSessionKey)}
            onBack={() => setScreen(practiceReturnScreen)}
            onFinish={() => setScreen("practice-report")}
            onToast={showToast}
          />
        )}

        {screen === "practice-report" && (
          <PracticeReportScreen
            session={getPracticeSession(practiceSessionKey)}
            onBack={() => setScreen("practice")}
            onChat={goChat}
            onToast={showToast}
          />
        )}

        {screen === "exam" && (
          <ExamScreen
            onOpenExam={(examId, nextScreen) => {
              setSelectedExamId(examId);
              setScreen(nextScreen);
            }}
          />
        )}

        {screen === "exam-verify" && (
          <ExamVerifyScreen
            exam={getExamItem(selectedExamId)}
            onBack={() => setScreen("exam")}
            onStart={() => setScreen("exam-intro")}
          />
        )}

        {screen === "exam-intro" && (
          <ExamIntroScreen
            exam={getExamItem(selectedExamId)}
            hasDraft={Boolean(examDrafts[selectedExamId])}
            onBack={() => setScreen("exam")}
            onStart={() => setScreen("exam-taking")}
          />
        )}

        {screen === "exam-taking" && (
          <ExamTakingScreen
            exam={getExamItem(selectedExamId)}
            initialDraft={examDrafts[selectedExamId]}
            onBack={(draft) => {
              setExamDrafts((current) => ({ ...current, [selectedExamId]: draft }));
              setScreen("exam");
            }}
            onFinish={() => {
              setExamDrafts((current) => {
                const next = { ...current };
                delete next[selectedExamId];
                return next;
              });
              setScreen("exam-report");
            }}
            onToast={showToast}
          />
        )}

        {screen === "exam-report" && (
          <ExamReportScreen
            exam={getExamItem(selectedExamId)}
            onBack={() => setScreen("exam")}
            onToast={showToast}
          />
        )}

        {screen === "profile-assets" && (
          <ProfileAssetsScreen
            onBack={backToProfileDrawer}
            onOpenScreen={(nextScreen) => {
              if (nextScreen) {
                setScreen(nextScreen);
                return;
              }

              showToast("该分组下一轮再细化");
            }}
          />
        )}

        {screen === "profile-reviews" && (
          <ProfileReviewsScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-materials" && (
          <ProfileMaterialsScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-self-tests" && (
          <ProfileSelfTestsScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-history" && (
          <ProfileHistoryScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-generated" && (
          <ProfileGeneratedScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-saved" && (
          <ProfileSavedScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-downloads" && (
          <ProfileDownloadsScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-adoptions" && (
          <ProfileAdoptionsScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
          />
        )}

        {screen === "profile-messages" && (
          <ProfileMessagesScreen
            onBack={backToProfileDrawer}
            onToast={showToast}
            onNavigate={(nextScreen, message) => {
              if (nextScreen) {
                setProfileOpen(false);
                setScreen(nextScreen);
                return;
              }

              showToast(message);
            }}
          />
        )}

        {!hideBottomTabs && <BottomTabs active={tabForScreen(screen, profileOriginTab)} onSelect={switchTab} />}

        {profileOpen && (
          <ProfileDrawer
            onClose={() => setProfileOpen(false)}
            onOpenAssets={() => openProfileScreen("profile-assets")}
            onOpenReviews={() => openProfileScreen("profile-reviews")}
            onOpenMaterials={() => openProfileScreen("profile-materials")}
            onOpenDownloads={() => openProfileScreen("profile-downloads")}
            onOpenMessages={() => openProfileScreen("profile-messages")}
            onToast={showToast}
          />
        )}
        {sourcePanel && <SourcePanel onClose={() => setSourcePanel(false)} onToast={showToast} />}
        {toast && <div className="toast">{toast}</div>}
      </section>
    </main>
  );
}

function HomeScreen({
  filter,
  setFilter,
  query,
  setQuery,
  spaces,
  onOpenDetail,
  onOpenChat,
  onProfile,
  onToast,
}) {
  const resumeCards = resumeCardsByFilter[filter] ?? resumeCardsByFilter["全部"];

  return (
    <div className="page home-page">
      <header className="home-header">
        <div>
          <p className="eyebrow">华东一区 · 杭州旗舰店</p>
          <h1>企业LM</h1>
        </div>
        <div className="header-actions">
          <button className="icon-button" onClick={() => onToast("选择：新建个人学习空间 / 上传资料 / 从模板创建")} aria-label="新建">
            <Plus size={24} weight="regular" />
          </button>
          <button className="avatar-button" onClick={onProfile} aria-label="个人中心">
            林
          </button>
        </div>
      </header>

      <label className="search-box">
        <MagnifyingGlass size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索学习空间"
        />
        {query && (
          <button className="clear-button" onClick={() => setQuery("")}>
            <X size={16} />
          </button>
        )}
      </label>

      <div className="segmented">
        {["全部", "课程", "资料", "专题"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="review-prompt" onClick={() => onToast("待复习来自 3 个学习空间")}>
        <BookmarkSimple size={20} />
        <span>你有 7 个待复习，来自 3 个学习空间</span>
        <CaretRight size={18} />
      </button>

      <section className="compact-section">
        <div className="section-heading">
          <h2>继续学习</h2>
          <button onClick={onOpenDetail}>全部</button>
        </div>
        <div className="resume-strip">
          {resumeCards.map((card) => (
            <button
              className={`resume-card ${card.tone}`}
              key={`${filter}-${card.space}-${card.title}`}
              onClick={onOpenDetail}
            >
              <span>{card.space}</span>
              <strong>{card.title}</strong>
              <small>{card.note}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="space-list">
        <div className="section-heading">
          <h2>学习空间</h2>
          <span>{spaces.length} 个</span>
        </div>
        {spaces.length === 0 ? (
          <div className="empty-state">
            <strong>没有找到学习空间</strong>
            <p>可以问 AI 试试，或换一个关键词。</p>
            <button onClick={onOpenChat}>问AI试试</button>
          </div>
        ) : (
          spaces.map((space) => (
            <button
              className={`space-card ${space.disabled ? "disabled" : ""}`}
              key={space.id}
              onClick={() => (space.disabled ? onToast("该学习空间权限已变更") : onOpenDetail())}
            >
              <div className={`space-mark ${space.accent}`}>
                {space.type === "课程" ? <Books size={20} /> : <Stack size={20} />}
              </div>
              <div className="space-main">
                <div className="space-title-row">
                  <strong>{space.name}</strong>
                  <span>{space.source}</span>
                </div>
                <p>{space.hint}</p>
                <div className="space-meta">
                  <span>{space.type}</span>
                  <span>{space.sources} 个来源</span>
                  <span>{space.read} 个已读</span>
                  <span>{space.review} 待复习</span>
                </div>
                {space.progress !== null && (
                  <div className="progress-track">
                    <i style={{ width: `${space.progress}%` }} />
                  </div>
                )}
              </div>
              {space.disabled ? <WarningCircle className="warning" size={22} /> : <CaretRight size={18} />}
            </button>
          ))
        )}
      </section>

      <button className="floating-ai-entry" onClick={onOpenChat}>
        <Sparkle size={18} weight="fill" />
        <span>问 AI 或生成学习内容</span>
        <ArrowUp size={18} weight="bold" />
      </button>
    </div>
  );
}

function DetailScreen({ onBack, onChat, onSourcePanel, onToast }) {
  return (
    <div className="page detail-page">
      <header className="detail-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <button className="plain-icon" onClick={() => onToast("更多：置顶 / 收藏 / 分享")}>
          <DotsThree size={28} weight="bold" />
        </button>
      </header>

      <section className="space-hero">
        <div className="badge-row">
          <span>企业</span>
          <span>资料</span>
          <span>进行中</span>
        </div>
        <h1>全屋定制产品知识库</h1>
        <p>产品手册、环保等级、五金系统和常见问题统一在这里学习和提问。</p>
        <div className="hero-stats">
          <span><Files size={18} />18 个来源</span>
          <span><ShieldCheck size={18} />7 个已读</span>
          <span><BookmarkSimple size={18} />2 个待复习</span>
        </div>
      </section>

      <button className="detail-ai-entry" onClick={onChat}>
        <Sparkle size={20} weight="fill" />
        <div>
          <strong>基于当前学习空间提问</strong>
          <span>支持总结、学习指南、自测和音频导学</span>
        </div>
        <ArrowUp size={18} />
      </button>

      <section className="resources-section">
        <div className="section-heading">
          <h2>资料来源</h2>
          <button onClick={onSourcePanel}>管理</button>
        </div>
        <div className="resource-list">
          {resources.map((resource) => (
            <button
              className={`resource-row ${resource.disabled ? "disabled" : ""}`}
              key={resource.title}
              onClick={() => resource.disabled ? onToast("该来源已不可访问") : onToast("进入资料详情")}
            >
              <FilePdf size={22} weight="fill" />
              <div>
                <strong>{resource.title}</strong>
                <span>{resource.source} · {resource.permission}</span>
              </div>
              <em>{resource.status}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="chapter-section">
        <div className="section-heading">
          <h2>推荐学习</h2>
          <span>按资料更新排序</span>
        </div>
        <button className="learning-row" onClick={() => onToast("继续阅读：板材与环保等级说明")}>
          <Books size={22} />
          <div>
            <strong>板材与环保等级说明</strong>
            <span>继续阅读 · 预计 6 分钟</span>
          </div>
          <CaretRight size={18} />
        </button>
        <button className="learning-row" onClick={() => onToast("进入待复习")}>
          <BookmarkSimple size={22} />
          <div>
            <strong>2 个待复习</strong>
            <span>来自环保等级和五金选型</span>
          </div>
          <CaretRight size={18} />
        </button>
      </section>
    </div>
  );
}

function WorkbenchScreen({ onProfile, onEnterpriseLm, onPractice, onExam, onToast }) {
  return (
    <div className="page workbench-page">
      <header className="module-header">
        <div>
          <p className="eyebrow">华东一区 · 杭州旗舰店</p>
          <h1>内训工作台</h1>
        </div>
        <button className="avatar-button" onClick={onProfile} aria-label="个人中心">
          林
        </button>
      </header>

      <section className="focus-panel">
        <div>
          <span>当前重点</span>
          <h2>完成入职培训第 4 章，并准备新品知识考试</h2>
        </div>
        <button onClick={onEnterpriseLm}>
          <Sparkle size={18} weight="fill" />
          企业LM
        </button>
      </section>

      <section className="compact-section">
        <div className="section-heading">
          <h2>待办</h2>
          <span>3 项</span>
        </div>
        <button className="task-row" onClick={onEnterpriseLm}>
          <Books size={23} />
          <div>
            <strong>新员工入职培训</strong>
            <span>继续第 4 章 · 今日截止</span>
          </div>
          <em>学习</em>
        </button>
        <button className="task-row" onClick={onPractice}>
          <Microphone size={23} />
          <div>
            <strong>高意向客户接待陪练</strong>
            <span>2 轮话术练习 · 可重复录音</span>
          </div>
          <em>陪练</em>
        </button>
        <button className="task-row" onClick={onExam}>
          <Exam size={23} />
          <div>
            <strong>新品知识考试</strong>
            <span>限时 20 分钟 · 明天 18:00 截止</span>
          </div>
          <em>考试</em>
        </button>
      </section>

      <section className="module-grid">
        <button onClick={onEnterpriseLm}>
          <Sparkle size={24} weight="fill" />
          <strong>企业LM</strong>
          <span>资料、课程、专题和 AI 提问</span>
        </button>
        <button onClick={onPractice}>
          <Microphone size={24} />
          <strong>陪练</strong>
          <span>场景话术练习和逐轮建议</span>
        </button>
        <button onClick={onExam}>
          <Exam size={24} />
          <strong>考试</strong>
          <span>限时作答、演讲题录音</span>
        </button>
        <button onClick={() => onToast("待复习来自企业LM、自测、陪练和考试建议")}>
          <BookmarkSimple size={24} />
          <strong>待复习</strong>
          <span>统一汇总，不单独做必做</span>
        </button>
      </section>
    </div>
  );
}

function PracticeScreen({ onOpenTask, onOpenCategory, onReport, onToast }) {
  return (
    <div className="page training-list-page">
      <header className="module-header training-module-header">
        <div>
          <p className="eyebrow">企业内训 · 源自康宸训练流</p>
          <h1>陪练</h1>
        </div>
        <button
          className="icon-button"
          onClick={() => onToast("先做组织下发任务，再做自选课题；作答页按录音转写和建议卡组织")}
          aria-label="练习说明"
        >
          <Info size={23} />
        </button>
      </header>

      <section className="training-section-card">
        <div className="training-section-head">
          <h2>我的练习任务</h2>
          <span>先做组织下发的练习任务，再做自选陪练。</span>
        </div>
        <div className="training-card-stack">
          {practiceTasks.map((task) => (
            <button
              key={task.id}
              className="training-row-card"
              onClick={() => onOpenTask(task.sessionKey)}
            >
              <div className="training-row-main">
                <strong>{task.title}</strong>
                <p>{task.summary}</p>
              </div>
              <div className="training-row-side">
                <em className={task.status === "进行中" ? "status-badge active" : "status-badge"}>
                  {task.status}
                </em>
                <span>{task.due}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="training-section-card">
        <div className="training-section-head">
          <h2>自选练习课题</h2>
          <span>按业务场景自己选练什么，不影响任务完成状态。</span>
        </div>
        <div className="training-card-stack">
          {practiceCategories.map((category) => (
            <button
              key={category.id}
              className="training-row-card category"
              onClick={() => onOpenCategory(category.id)}
            >
              <div className="training-row-main">
                <strong>{category.title}</strong>
                <p>{category.summary}</p>
              </div>
              <CaretRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <button className="training-link-button" onClick={onReport}>
        查看最近反馈
      </button>
    </div>
  );
}

function PracticeDetailScreen({ category, onBack, onOpenTopic }) {
  return (
    <div className="page training-detail-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>{category.title}</h1>
          <span>{category.summary}</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className="training-section-card compact">
        <div className="training-section-head">
          <h2>当前课题</h2>
          <span>点进去直接开始陪练，中间不再走准备页。</span>
        </div>
        <div className="training-card-stack">
          {category.topics.map((topic) => (
            <button
              key={topic.id}
              className="training-row-card category"
              onClick={() => onOpenTopic(topic.sessionKey)}
            >
              <div className="training-row-main">
                <strong>{topic.title}</strong>
                <p>{topic.summary}</p>
              </div>
              <CaretRight size={18} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function PracticeRoleScreen() {
  return null;
}

function PracticeSessionScreen({ session, onBack, onFinish, onToast }) {
  const pages = session.pages ?? [
    {
      id: "single-page",
      text: session.text,
      slide: session.slide,
      reference: session.reference,
      advice: session.advice,
      scoreFocus: session.scoreFocus,
      transcriptSample: session.transcriptSample,
    },
  ];
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finishOpen, setFinishOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [landscapeOpen, setLandscapeOpen] = useState(false);
  const [recording, setRecording] = useState(false);

  const currentPage = pages[pageIndex];
  const totalPages = pages.length;
  const transcript = answers[currentPage.id] ?? "";
  const hasAnswer = transcript.trim().length > 0;
  const doneCount = pages.filter((page) => (answers[page.id] ?? "").trim()).length;
  const isLastPage = pageIndex === totalPages - 1;
  const canUseLandscape = Boolean(currentPage.slide);
  const progressPercent = ((pageIndex + 1) / totalPages) * 100;
  const primaryLabel = isLastPage ? "查看反馈" : "继续";

  const updateTranscript = (value) => {
    setAnswers((current) => ({
      ...current,
      [currentPage.id]: value,
    }));
  };

  const handleContinue = () => {
    if (recording) {
      onToast("请先结束录音");
      return;
    }
    if (!hasAnswer) {
      onToast("本页未作答，反馈会生成待补充状态");
    }
    if (isLastPage) {
      onFinish();
      return;
    }
    setPageIndex((current) => Math.min(totalPages - 1, current + 1));
  };

  const handlePrevious = () => {
    if (recording) {
      onToast("请先结束录音");
      return;
    }
    setPageIndex((current) => Math.max(0, current - 1));
  };

  return (
    <div className="page training-session-page answer-composer-page practice-session-page">
      <header className="flow-header training-session-header">
        <button className="plain-icon" onClick={() => setExitOpen(true)} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>{session.title}</h1>
          <span>{pageIndex + 1}/{totalPages} · 已完成 {doneCount}/{totalPages}</span>
        </div>
        <em>{pageIndex + 1}/{totalPages}</em>
      </header>

      <div className="training-progress-bar">
        <i style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="training-session-scroll">
        <section className="training-task-panel">
          <div className="training-task-top">
            <div className="training-chip-row">
              <span className="training-chip">{session.scene}</span>
              <span className="training-chip muted">演讲题 · {session.type}</span>
            </div>
          </div>
          <p className="training-task-question">{currentPage.text}</p>
        </section>

        {currentPage.slide && (
          <section className="training-material-card">
            <div className="training-section-topline">
              <span>PPT 第 {pageIndex + 1} 页</span>
              <button className="landscape-pill" onClick={() => setLandscapeOpen(true)}>
                <DeviceMobile size={13} />
                横屏作答
              </button>
            </div>
            <TrainingSlidePreview slide={currentPage.slide} />
          </section>
        )}
      </div>

      <div className="training-workbench">
        <TrainingVoiceAnswerDock
          key={currentPage.id}
          transcript={transcript}
          onChange={updateTranscript}
          transcriptSample={currentPage.transcriptSample}
          title="本页作答"
          statusLink={hasAnswer && !recording ? "查看讲解" : ""}
          onStatusLink={() => setExplainOpen(true)}
          onRecordingChange={setRecording}
        />

        <div className="training-bottom-bar">
          <div className="training-action-grid">
            <button
              className={pageIndex === 0 ? "training-action ghost disabled" : "training-action ghost"}
              disabled={pageIndex === 0}
              onClick={handlePrevious}
            >
              上一个
            </button>
            <button
              className="training-action primary"
              onClick={handleContinue}
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>

      {finishOpen && (
        <TrainingConfirmSheet
          title="结束练习"
          note="可以进入反馈页；如果录音仍在处理中，反馈会显示生成中。"
          confirmLabel="生成反馈"
          cancelLabel="继续练习"
          onCancel={() => setFinishOpen(false)}
          onConfirm={onFinish}
        />
      )}

      {exitOpen && (
        <TrainingConfirmSheet
          title="退出练习"
          note="当前练习不会自动保留，确认返回陪练首页吗？"
          confirmLabel="确认返回"
          cancelLabel="继续练习"
          warning
          onCancel={() => setExitOpen(false)}
          onConfirm={onBack}
        />
      )}

      {explainOpen && (
        <TrainingInsightSheet
          title="查看讲解"
          sections={[
            { title: "参考答案", content: currentPage.reference },
            { title: "当前建议", items: currentPage.advice },
            { title: "评分关注点", items: currentPage.scoreFocus },
          ]}
          onClose={() => setExplainOpen(false)}
        />
      )}

      {landscapeOpen && canUseLandscape && (
        <TrainingLandscapeMode
          title={session.title}
          progress={`${pageIndex + 1}/${totalPages} · PPT 讲解`}
          task={currentPage.text}
          slide={currentPage.slide}
          answerTitle="本页作答"
          transcript={transcript}
          onChange={updateTranscript}
          transcriptSample={currentPage.transcriptSample}
          onClose={() => setLandscapeOpen(false)}
          onToast={onToast}
          onPrimary={handleContinue}
          primaryLabel={primaryLabel}
          canGoPrev={pageIndex > 0}
          onPrevious={handlePrevious}
          allowInsight={hasAnswer && !recording}
          onInsight={() => setExplainOpen(true)}
        />
      )}
    </div>
  );
}

function PracticeReportScreen({ session, onBack, onChat, onToast }) {
  return (
    <div className="page report-page training-report-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>训练反馈</h1>
          <span>{session.title}</span>
        </div>
        <button className="plain-icon" onClick={() => onToast("已复制反馈建议")} aria-label="复制">
          <Copy size={23} />
        </button>
      </header>

      <section className="report-summary">
        <span>本次反馈</span>
        <h2>先讲价值，再讲边界</h2>
        <p>你的表达已经能覆盖关键点，但开头可以更快进入“为什么现场需要它”，再补一句复杂审批不在手机里做。</p>
      </section>

      <section className="suggestion-list">
        <article>
          <Flag size={22} />
          <div>
            <strong>表达建议</strong>
            <p>建议第一句先交代“调研归档管理”是现场入口，再展开三件核心事。</p>
          </div>
        </article>
        <article>
          <BookmarkSimple size={22} />
          <div>
            <strong>待复习</strong>
            <p>“调研归档管理入口”“需求评估边界”已加入待复习。</p>
          </div>
        </article>
      </section>

      <button className="secondary-action" onClick={onChat}>
        <Sparkle size={18} weight="fill" />
        基于资料问企业LM
      </button>
    </div>
  );
}

function ExamScreen({ onOpenExam }) {
  const [activeFilter, setActiveFilter] = useState("待考");
  const filteredExams = examItems.filter((item) => item.status === activeFilter);

  return (
    <div className="page training-list-page">
      <header className="module-header training-module-header">
        <div>
          <p className="eyebrow">企业内训 · 源自康宸训练流</p>
          <h1>考试</h1>
        </div>
      </header>

      <div className="exam-filter-row">
        {examFilters.map((filter) => (
          <button
            key={filter}
            className={filter === activeFilter ? "exam-filter active" : "exam-filter"}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="training-card-stack exam-list-stack">
        {filteredExams.map((item) => {
          const isCompleted = item.status === "已完成";
          const ctaLabel = isCompleted ? "查看结果" : item.status === "进行中" ? "继续考试" : "开始考试";
          const nextScreen = isCompleted ? "exam-report" : "exam-verify";

          return (
            <article key={item.id} className="exam-list-card">
              <div className="training-row-main">
                <div className="exam-card-head">
                  <strong>{item.title}</strong>
                  <span className={item.status === "待考" ? "status-badge active" : "status-badge"}>
                    {item.status}
                  </span>
                </div>
                <p>{item.category} · {item.questionCount} 题 · {item.duration}</p>
              </div>
              <div className="exam-card-foot">
                <span>截止 {item.due}</span>
                <button
                  className={isCompleted ? "training-mini-action ghost" : "training-mini-action primary"}
                  onClick={() => onOpenExam(item.id, nextScreen)}
                >
                  {ctaLabel}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function ExamVerifyScreen({ exam, onBack, onStart }) {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    if (phase !== "checking") return undefined;
    const timer = window.setTimeout(() => {
      setPhase("done");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div className="page verify-page training-verify-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>身份验证</h1>
          <span>{exam.title}</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className={phase === "done" ? "verify-camera verified" : "verify-camera"}>
        <div className="verify-face">
          <UserCircle size={78} weight="fill" />
        </div>
        <span>
          {phase === "checking" ? "人脸识别中…" : phase === "done" ? "验证成功" : "您即将进行人脸识别验证"}
        </span>
        <p className="verify-copy">
          {phase === "done"
            ? "即将进入正式考试流程。"
            : "本次考试前需完成身份核验，请将面部置于框内，保持光线充足。"}
        </p>
      </section>

      <section className="training-rule-card">
        <div className="training-rule-line">
          <ShieldCheck size={15} />
          <span>人脸数据仅用于身份核验，不会留存。</span>
        </div>
      </section>

      <section className="prep-list compact">
        <article>
          <strong>设备检测</strong>
          <p>摄像头、麦克风已就绪。主观题使用录音作答，系统在后台转写和评分。</p>
        </article>
      </section>

      {phase !== "done" ? (
        <button className="primary-action page-bottom-action" onClick={() => setPhase("checking")}>
          {phase === "checking" ? "识别中..." : "开始验证"}
        </button>
      ) : (
        <button className="primary-action page-bottom-action" onClick={onStart}>
          进入考试
        </button>
      )}
    </div>
  );
}

function ExamIntroScreen({ exam, hasDraft, onBack, onStart }) {
  return (
    <div className="page training-detail-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>开始考试</h1>
          <span>{exam.title}</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className="training-summary-card">
        <strong>{exam.title}</strong>
        <div className="training-summary-grid">
          <article>
            <span>总题数</span>
            <b>{exam.questionCount} 题</b>
          </article>
          <article>
            <span>总时长</span>
            <b>{exam.duration}</b>
          </article>
        </div>
      </section>

      {hasDraft && (
        <section className="training-resume-note">
          <strong>上次答题进度已保存</strong>
          <p>点击开始将从断点继续作答。</p>
        </section>
      )}

      <section className="prep-list compact">
        <article>
          <strong>考试规则</strong>
          <p>开始后页面会显示倒计时；主观题使用录音作答，转写和评分由后台继续处理。</p>
        </article>
        <article>
          <strong>续考说明</strong>
          <p>中途退出后答题进度会保留，下次进入可继续作答。</p>
        </article>
      </section>

      <button className="primary-action page-bottom-action" onClick={onStart}>
        开始考试
      </button>
    </div>
  );
}

function ExamTakingScreen({ exam, initialDraft, onBack, onFinish, onToast }) {
  const [questionIndex, setQuestionIndex] = useState(initialDraft?.questionIndex ?? 0);
  const [answers, setAnswers] = useState(initialDraft?.answers ?? {});
  const [elapsed, setElapsed] = useState(initialDraft?.elapsed ?? 0);
  const [finishOpen, setFinishOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [landscapeOpen, setLandscapeOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsed((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const question = examQuestions[questionIndex];
  const total = examQuestions.length;
  const currentAnswer = answers[question.id] ?? "";
  const doneCount = examQuestions.filter((item) => (answers[item.id] ?? "").trim()).length;
  const isLastQuestion = questionIndex === total - 1;
  const isObjective = question.type === "single";
  const hasMaterial = Boolean(question.slide);
  const durationSeconds = parseExamDurationSeconds(exam.duration);
  const remainingSeconds = Math.max(durationSeconds - elapsed, 0);
  const unansweredCount = total - doneCount;
  const processingCount = examQuestions.filter((item) => item.type !== "single" && (answers[item.id] ?? "").trim()).length;
  const progressPercent = ((questionIndex + 1) / total) * 100;
  const hasCurrentAnswer = (currentAnswer ?? "").trim().length > 0;
  const primaryDisabled = recording || (!isLastQuestion && !hasCurrentAnswer);

  const saveDraftAndBack = () => {
    onBack({
      questionIndex,
      answers,
      elapsed,
    });
  };

  const handlePrimaryAction = () => {
    if (recording) {
      onToast("请先结束录音");
      return;
    }
    if (isLastQuestion) {
      setFinishOpen(true);
      return;
    }
    if (!hasCurrentAnswer) {
      onToast(isObjective ? "请先选择答案再继续" : "请先完成本题录音作答");
      return;
    }
    setQuestionIndex((current) => Math.min(total - 1, current + 1));
  };

  return (
    <div className="page training-session-page answer-composer-page exam-taking-page">
      <header className="flow-header training-session-header">
        <button className="plain-icon" onClick={() => setExitOpen(true)} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>{exam.title}</h1>
          <span>{questionIndex + 1}/{total} · 已答 {doneCount}/{total}</span>
        </div>
        <em className={remainingSeconds <= 180 ? "exam-timer warning" : "exam-timer"}>
          {formatCountdownSeconds(remainingSeconds)}
        </em>
      </header>

      <div className="training-progress-bar exam-progress-bar">
        <i style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="exam-session-scroll">
        <section className="exam-rule-strip" aria-label="考试规则状态">
          <span>
            <ShieldCheck size={14} weight="fill" />
            正式考试
          </span>
          <span>倒计时中</span>
          <span>录音后台处理</span>
        </section>

        <section className="training-question-card exam exam-question-panel">
          <div className="training-chip-row">
            <span className="training-chip">第 {questionIndex + 1} / {total} 题</span>
            <span className="training-chip muted">{question.label}</span>
            {!isObjective && <span className="training-chip muted">演讲题</span>}
          </div>
          <p>{question.text}</p>
        </section>

        {question.slide && (
          <section className="training-material-card exam-material-card">
            <div className="training-section-topline">
              <span>PPT 第 1 页</span>
              <button className="landscape-pill" onClick={() => setLandscapeOpen(true)}>
                <DeviceMobile size={13} />
                横屏作答
              </button>
            </div>
            <TrainingSlidePreview slide={question.slide} />
          </section>
        )}

        {isObjective && (
          <section className="exam-answer-panel">
            <div className="training-section-topline">
              <span>选择答案</span>
              <em>提交前可修改</em>
            </div>
            <TrainingChoiceAnswerCard
              options={question.options}
              value={currentAnswer}
              onChange={(value) =>
                setAnswers((current) => ({
                  ...current,
                  [question.id]: value,
                }))
              }
            />
          </section>
        )}
      </div>

      <div className="training-workbench exam-workbench">
        {!isObjective && (
          <TrainingVoiceAnswerDock
            key={question.id}
            transcript={currentAnswer}
            onChange={(value) =>
              setAnswers((current) => ({
                ...current,
                [question.id]: value,
              }))
            }
            transcriptSample={question.transcriptSample}
            title="本题作答"
            onRecordingChange={setRecording}
          />
        )}

        <div className="training-bottom-bar">
          <div className="training-action-grid two">
            <button
              className={questionIndex === 0 ? "training-action ghost disabled" : "training-action ghost"}
              disabled={questionIndex === 0}
              onClick={() => setQuestionIndex((current) => Math.max(0, current - 1))}
            >
              上一个
            </button>
            <button
              className={primaryDisabled ? "training-action primary disabled" : "training-action primary"}
              disabled={primaryDisabled}
              onClick={handlePrimaryAction}
            >
              {isLastQuestion ? "交卷" : "继续"}
            </button>
          </div>
        </div>
      </div>

      {finishOpen && (
        <TrainingConfirmSheet
          title="确认交卷"
          note={`已作答 ${doneCount} / 共 ${total} 题，未作答 ${unansweredCount} 题。${processingCount ? `其中 ${processingCount} 题录音处理中，交卷后系统会继续生成报告。` : "确认交卷后进入考试结果页。"}`}
          confirmLabel="确认交卷"
          cancelLabel="再检查一下"
          warning={unansweredCount > 0}
          onCancel={() => setFinishOpen(false)}
          onConfirm={onFinish}
        />
      )}

      {exitOpen && (
        <TrainingConfirmSheet
          title="退出考试"
          note="本次考试允许中断续考，返回后答题进度会保存，下次进入可继续作答。"
          confirmLabel="确认返回"
          cancelLabel="继续考试"
          warning
          onCancel={() => setExitOpen(false)}
          onConfirm={saveDraftAndBack}
        />
      )}

      {landscapeOpen && hasMaterial && (
        <TrainingLandscapeMode
          title={exam.title}
          progress={`${questionIndex + 1}/${total} · ${formatCountdownSeconds(remainingSeconds)}`}
          task={question.text}
          slide={question.slide}
          answerTitle="本题作答"
          transcript={currentAnswer}
          onChange={(value) =>
            setAnswers((current) => ({
              ...current,
              [question.id]: value,
            }))
          }
          transcriptSample={question.transcriptSample}
          onClose={() => setLandscapeOpen(false)}
          onToast={onToast}
          onPrimary={handlePrimaryAction}
          primaryLabel={isLastQuestion ? "交卷" : "继续"}
          primaryDisabled={primaryDisabled}
          canGoPrev={questionIndex > 0}
          onPrevious={() => setQuestionIndex((current) => Math.max(0, current - 1))}
        />
      )}
    </div>
  );
}

function TrainingSlidePreview({ slide }) {
  return (
    <div className="training-slide-frame" aria-label="PPT 页面预览">
      <div className="training-slide-toolbar">
        <span>{slide.fileName ?? "调研归档管理.pptx"}</span>
        <em>{slide.pageLabel ?? "1/1"}</em>
      </div>
      <div className="training-slide-surface">
        <div className="training-slide-brand">康宸内训</div>
        <strong>{slide.title}</strong>
        <ul>
          {slide.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="training-slide-footer">{slide.footer ?? "现场入口 · 流程讲解"}</div>
      </div>
    </div>
  );
}

function TrainingVoiceAnswerDock({
  transcript,
  onChange,
  transcriptSample = [],
  title,
  statusLink = "",
  onStatusLink,
  onRecordingChange,
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    onRecordingChange?.(recording);
  }, [onRecordingChange, recording]);

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  useEffect(() => {
    if (!recording || cursor >= transcriptSample.length) return undefined;
    const timer = window.setTimeout(() => {
      const nextLine = transcriptSample[cursor];
      onChange(transcript ? `${transcript}\n${nextLine}` : nextLine);
      setCursor((current) => current + 1);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [cursor, onChange, recording, transcript, transcriptSample]);

  const hasAnswer = transcript.trim().length > 0;
  const displaySeconds = recordedSeconds || seconds;
  const status = recording
    ? `录音中 ${formatVoiceSeconds(seconds)}`
    : hasAnswer
      ? displaySeconds
        ? `已录音 ${formatVoiceSeconds(displaySeconds)}`
        : "已录音"
      : "待开始";
  const statusNote = recording
    ? "录音中不可切换"
    : hasAnswer
      ? "处理中 · 后台转写和评分"
      : "点击开始录制";
  const buttonLabel = recording ? "结束录音" : hasAnswer ? "重录" : "开始录音";

  const handleRecord = () => {
    if (recording) {
      setRecording(false);
      setRecordedSeconds(Math.max(seconds, 1));
      return;
    }
    if (hasAnswer) {
      onChange("");
      setCursor(0);
      setSeconds(0);
      setRecordedSeconds(0);
    }
    setRecording(true);
  };

  return (
    <section className="voice-answer-dock">
      <div className="voice-answer-status">
        <div>
          <strong>{title} · {status}</strong>
          <span>{statusNote}</span>
        </div>
        {statusLink && (
          <button className="voice-status-link" onClick={onStatusLink}>
            {statusLink}
          </button>
        )}
      </div>

      {hasAnswer && (
        <details className="voice-transcript-detail">
          <summary>查看转写</summary>
          <p>{transcript}</p>
        </details>
      )}

      <button className={recording ? "voice-record-main recording" : "voice-record-main"} onClick={handleRecord}>
        <Microphone size={18} />
        {buttonLabel}
      </button>
    </section>
  );
}

function TrainingInsightSheet({ title, sections, onClose }) {
  return (
    <div className="training-confirm-mask">
      <div className="insight-sheet">
        <div className="training-confirm-head">
          <strong>{title}</strong>
          <button onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>
        <div className="insight-section-stack">
          {sections.map((section) => (
            <section key={section.title} className="insight-section">
              <strong>{section.title}</strong>
              {section.content && <p>{section.content}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrainingLandscapeMode({
  title,
  progress,
  task,
  slide,
  answerTitle,
  transcript,
  onChange,
  transcriptSample,
  onClose,
  onToast,
  onPrimary,
  primaryLabel,
  primaryDisabled = false,
  canGoPrev = false,
  onPrevious,
  allowInsight = false,
  onInsight,
}) {
  const [recording, setRecording] = useState(false);

  const handlePrevious = () => {
    if (!canGoPrev) return;
    if (recording) {
      onToast("请先结束录音");
      return;
    }
    onPrevious?.();
  };

  const handlePrimary = () => {
    if (recording) {
      onToast("请先结束录音");
      return;
    }
    if (primaryDisabled) return;
    onPrimary();
  };

  return (
    <div className="landscape-mode-mask">
      <div className="landscape-mode">
        <main className="landscape-stage">
          <header className="landscape-topbar">
            <button onClick={onClose} aria-label="关闭横屏作答">
              <CaretLeft size={20} />
            </button>
            <div>
              <strong>{title}</strong>
              <span>{progress}</span>
            </div>
          </header>
          <TrainingSlidePreview slide={slide} />
        </main>
        <aside className="landscape-control-rail">
          <button className="landscape-more" onClick={onClose} aria-label="更多或退出">
            <DotsThree size={22} />
          </button>
          <p>{task}</p>
          <div className="landscape-nav-stack">
            <button
              className={canGoPrev ? "landscape-nav" : "landscape-nav disabled"}
              disabled={!canGoPrev || recording}
              onClick={handlePrevious}
            >
              <CaretLeft size={18} />
              上一个
            </button>
            <button
              className={primaryDisabled ? "landscape-nav primary disabled" : "landscape-nav primary"}
              disabled={primaryDisabled}
              onClick={handlePrimary}
            >
              <CaretRight size={18} />
              {primaryLabel}
            </button>
          </div>
          <TrainingVoiceAnswerDock
            transcript={transcript}
            onChange={onChange}
            transcriptSample={transcriptSample}
            title={answerTitle}
            onRecordingChange={setRecording}
          />
          {allowInsight && (
            <button className="landscape-insight-link" onClick={onInsight}>
              查看讲解
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

function TrainingListBlock({ title, items, variant = "muted" }) {
  const className = variant === "coach" ? "training-coach-list" : "training-muted-block";

  return (
    <div className={className}>
      <strong>{title}</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TrainingChoiceAnswerCard({ options = [], value, onChange }) {
  return (
    <section className="training-choice-card">
      {options.map((option, index) => {
        const optionKey = String.fromCharCode(65 + index);
        const selected = value === option;
        return (
          <button
            key={option}
            className={selected ? "training-option active" : "training-option"}
            onClick={() => onChange(option)}
          >
            <b>{optionKey}</b>
            <span>{option}</span>
          </button>
        );
      })}
    </section>
  );
}

function TrainingConfirmSheet({
  title,
  note,
  confirmLabel,
  cancelLabel,
  warning,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="training-confirm-mask">
      <div className="training-confirm-sheet">
        <div className="training-confirm-head">
          <strong>{title}</strong>
          <button onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <p>{note}</p>
        <div className="training-confirm-actions">
          <button className="training-action ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className={warning ? "training-action danger" : "training-action primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function parseExamDurationSeconds(duration = "") {
  const minutes = Number.parseInt(duration, 10);
  return Number.isFinite(minutes) ? minutes * 60 : 0;
}

function formatCountdownSeconds(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  if (hours <= 0) return `${minutes}:${seconds}`;
  return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
}

function formatVoiceSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function ExamReportScreen({ exam, onBack, onToast }) {
  return (
    <div className="page report-page training-report-page exam-report-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>考试结果</h1>
          <span>{exam.title}</span>
        </div>
        <button className="plain-icon" onClick={() => onToast("当前展示建议和复核状态，结果更新后会继续同步")} aria-label="说明">
          <Info size={23} />
        </button>
      </header>

      <section className="report-summary exam-result">
        <span>已完成</span>
        <h2>结果已生成，演讲题待复核</h2>
        <p>客观题已自动判定。演讲题进入复核后，会继续补充建议，并同步进入你的待复习。</p>
      </section>

      <section className="suggestion-list">
        <article>
          <CheckCircle size={22} />
          <div>
            <strong>单选题建议</strong>
            <p>回答方向正确：先解释环保释放量要求，再结合儿童房等场景说明。</p>
          </div>
        </article>
        <article>
          <SealWarning size={22} />
          <div>
            <strong>演讲题状态</strong>
            <p>待人工复核。复核完成后，会同步更新结果明细和待复习状态。</p>
          </div>
        </article>
      </section>
    </div>
  );
}

function ChatScreen({ isMenuOpen, setIsMenuOpen, generated, onBack, onGenerate, onToast }) {
  return (
    <div className="chat-page">
      <header className="chat-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={31} />
        </button>
        <h1>全屋定制产品知识库</h1>
        <button className="scope-chip" onClick={() => onToast("当前范围：全屋定制产品知识库")}>
          当前学习空间 <CaretDown size={15} />
        </button>
        <button className="more-button" aria-label="更多" onClick={() => onToast("更多：清空上下文 / 查看历史")}>
          <DotsThree size={25} weight="bold" />
        </button>
      </header>

      <button className="context-strip" onClick={() => onToast("18 个来源中，7 个已读，2 个待复习")}>
        <span><Files size={18} />18 个来源</span>
        <i />
        <span><ShieldCheck size={18} />7 个已读</span>
        <i />
        <span><BookmarkSimple size={18} />2 个待复习</span>
        <CaretRight size={18} />
      </button>

      <section className="chat-scroll">
        <p className="time-marker">09:42</p>
        <div className="question-bubble">E0 级板材和 ENF 级板材怎么给客户解释？</div>

        <div className="assistant-line">
          <div className="assistant-logo"><Books size={23} weight="fill" /></div>
          <span>企业LM助手</span>
          <small>09:42</small>
        </div>

        <article className="answer-card">
          <p>
            可以先用“环保释放量等级”解释，再用客户能理解的话转译。E0 级强调符合较高环保标准，适合家庭日常居住；ENF 级要求更严格，更适合儿童房、老人房等对环保更敏感的场景。<a>[1][2]</a>
          </p>

          <div className="source-title">来源 3</div>
          <div className="source-list">
            <button className="source-row" onClick={() => onToast("进入：板材与环保等级说明.pdf")}>
              <FilePdf size={22} weight="fill" />
              <span>企业｜板材与环保等级说明.pdf</span>
              <em>已可提问</em>
              <b>1</b>
            </button>
            <button className="source-row" onClick={() => onToast("进入：2026 全屋定制产品手册.pdf")}>
              <FilePdf size={22} weight="fill" />
              <span>企业｜2026 全屋定制产品手册.pdf</span>
              <em>已可提问</em>
              <b>2</b>
            </button>
            <button className="source-row disabled" onClick={() => onToast("该来源已不可访问")}>
              <FilePdf size={22} weight="fill" />
              <span>企业｜售后投诉处理案例库，权限已变更</span>
              <SealWarning size={22} weight="bold" />
            </button>
          </div>

          <div className="answer-actions">
            <button onClick={() => onToast("已复制回答")}><Copy size={20} />复制</button>
            <button onClick={() => onToast("已记录：有用")}><ThumbsUp size={20} />有用</button>
            <button onClick={() => onToast("已记录：无用")}><ThumbsDown size={20} />无用</button>
            <button onClick={() => onToast("已提交建议采纳")}><Flag size={20} />建议采纳</button>
          </div>
        </article>

        <div className="ai-disclaimer">
          <ShieldCheck size={15} /> AI 回答基于当前范围，具体请以实际业务为准
        </div>

        {generated && (
          <article className="generated-card">
            <div className="generated-icon"><Sparkle size={20} weight="fill" /></div>
            <div>
              <strong>{generated.title}</strong>
              <p>{generated.body}</p>
              <button onClick={() => onToast(generated.cta)}>{generated.cta}</button>
            </div>
          </article>
        )}
      </section>

      <div className="chat-composer-area">
        {isMenuOpen && <PlusMenu onGenerate={onGenerate} />}
        <div className="composer">
          <button className={`plus-button ${isMenuOpen ? "open" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="展开生成能力">
            {isMenuOpen ? <X size={26} /> : <Plus size={28} />}
          </button>
          <div className="input-pill">继续提问或生成学习内容</div>
          <button className="mic-button" onClick={() => onToast("语音输入")}>
            <Microphone size={29} />
          </button>
          <button className="send-button" onClick={() => onToast("已发送")}>
            <ArrowUp size={27} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlusMenu({ onGenerate }) {
  return (
    <div className="plus-menu">
      {plusActions.map(({ label, icon: Icon, kind }) => (
        <button key={label} onClick={() => onGenerate(kind)}>
          <Icon size={25} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function BottomTabs({ active, onSelect }) {
  const items = [
    { label: "内训工作台", icon: House },
    { label: "企业LM", icon: Sparkle },
    { label: "陪练", icon: Microphone },
    { label: "考试", icon: Exam },
  ];
  return (
    <nav className="bottom-tabs">
      {items.map(({ label, icon: Icon }) => (
        <button key={label} className={active === label ? "active" : ""} onClick={() => onSelect(label)}>
          <Icon size={22} weight={active === label ? "fill" : "regular"} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function ProfileHeader({ title, subtitle, onBack, actionIcon: ActionIcon, onAction, actionLabel }) {
  return (
    <header className="flow-header profile-flow-header">
      <button className="plain-icon" onClick={onBack} aria-label="返回">
        <CaretLeft size={30} />
      </button>
      <div>
        <h1>{title}</h1>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      {ActionIcon ? (
        <button className="plain-icon" onClick={onAction} aria-label={actionLabel}>
          <ActionIcon size={22} />
        </button>
      ) : (
        <span className="header-spacer" />
      )}
    </header>
  );
}

function FilterRow({ items, value, onChange }) {
  return (
    <div className="filter-chip-row">
      {items.map((item) => (
        <button
          key={item}
          className={item === value ? "filter-chip active" : "filter-chip"}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function ProfileAssetsScreen({ onBack, onOpenScreen }) {
  return (
    <div className="page profile-page">
      <ProfileHeader
        title="我的学习资产"
        subtitle="先看提醒，再看个人沉淀内容"
        onBack={onBack}
      />

      <section className="profile-priority-stack">
        <button className="profile-priority-card strong" onClick={() => onOpenScreen("profile-reviews")}>
          <BookmarkSimple size={20} />
          <div>
            <strong>待复习</strong>
            <span>7 项 · 来自 3 个学习空间</span>
          </div>
          <em>优先处理</em>
        </button>
        <button className="profile-priority-card" onClick={() => onOpenScreen("profile-messages")}>
          <Info size={20} />
          <div>
            <strong>消息未读</strong>
            <span>3 条需要查看</span>
          </div>
          <em>进入消息</em>
        </button>
        <button className="profile-priority-card" onClick={() => onOpenScreen("profile-downloads")}>
          <WarningCircle size={20} />
          <div>
            <strong>关键权限变化</strong>
            <span>1 个下载项已不可继续打开</span>
          </div>
          <em>去处理</em>
        </button>
      </section>

      <section className="profile-group-list">
        {profileAssetGroups.map(({ key, title, count, status, icon: Icon, screen }) => (
          <button
            key={key}
            className="profile-group-card"
            onClick={() => onOpenScreen(screen)}
          >
            <div className="profile-group-mark">
              <Icon size={20} />
            </div>
            <div className="profile-group-main">
              <div className="profile-group-head">
                <strong>{title}</strong>
                <span>{count}</span>
              </div>
              <p>{status}</p>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
    </div>
  );
}

function ProfileReviewsScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "考试错题", "陪练表现不足", "企业LM自测", "知识卡复习建议", "学习行为形成"];
  const items = reviewItems.filter((item) => activeFilter === "全部" || item.source === activeFilter);

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="待复习"
        subtitle="不是归档资产，而是待处理入口"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className="profile-item-card"
            onClick={() => onToast(`进入待复习详情：${item.title}`)}
          >
            <div className="profile-item-mark">
              <BookmarkSimple size={20} />
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.source} · {item.space}</p>
              <div className="profile-item-meta">
                <span>{item.point}</span>
                <span>{item.action}</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
      <button className="secondary-action" onClick={() => onToast("待复习入口同时出现在工作台、企业LM、报告页和个人中心")}>
        <BookmarkSimple size={18} />
        待复习会在多个入口同步出现
      </button>
    </div>
  );
}

function ProfileMaterialsScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "个人学习空间", "企业学习空间补充", "解析中", "AI暂不可用", "已转正式", "来源不可访问"];
  const items = personalMaterials.filter((item) => {
    if (activeFilter === "全部") return true;
    if (["个人学习空间", "企业学习空间补充"].includes(activeFilter)) {
      return item.scopeType === activeFilter;
    }
    return item.status === activeFilter;
  });

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="个人资料"
        subtitle="上传后仍需落在学习空间内"
        onBack={onBack}
        actionIcon={UploadSimple}
        actionLabel="上传资料"
        onAction={() => onToast("先选择目标学习空间，再在工作空间内上传资料")}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="profile-item-card"
              onClick={() => onToast(`进入资料详情：${item.title}`)}
            >
              <div className="profile-item-mark">
                <Icon size={20} />
              </div>
              <div className="profile-item-main">
                <div className="profile-item-head">
                  <strong>{item.title}</strong>
                  <span className="item-pill">{item.status}</span>
                </div>
                <p>{item.scope}</p>
                <div className="profile-item-meta">
                  <span>{item.kind}</span>
                  <span>{item.updated}</span>
                </div>
              </div>
              <CaretRight size={18} />
            </button>
          );
        })}
      </section>
    </div>
  );
}

function ProfileSelfTestsScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "个人自测", "管理员下发", "待复习", "已建议采纳", "来源不可访问"];
  const items = selfTestItems.filter((item) => {
    if (activeFilter === "全部") return true;
    if (["个人自测", "管理员下发"].includes(activeFilter)) return item.origin === activeFilter;
    return item.status === activeFilter;
  });

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="自测记录"
        subtitle="不进入正式成绩，错题会回到待复习"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className="profile-item-card"
            onClick={() => onToast(`查看自测记录：${item.title}`)}
          >
            <div className="profile-item-mark">
              <CheckCircle size={20} />
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.scope}</p>
              <div className="profile-item-meta">
                <span>{item.origin}</span>
                <span>{item.summary}</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
      <button className="secondary-action" onClick={() => onToast("个人自测和管理员下发自测都不进入正式成绩管理")}>
        <Info size={18} />
        自测只回流待复习和候选题库
      </button>
    </div>
  );
}

function ProfileHistoryScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "学习空间", "资料或章节", "私有原件", "来源不可访问"];
  const items = questionHistoryItems.filter((item) => {
    if (activeFilter === "全部") return true;
    if (activeFilter === "来源不可访问") return item.status === activeFilter;
    return item.scopeType === activeFilter;
  });

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="问答历史"
        subtitle="只聚合你自己的 AI 对话记录"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className="profile-item-card"
            onClick={() => onToast(`进入对话详情：${item.title}`)}
          >
            <div className="profile-item-mark">
              <NotePencil size={20} />
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.scope}</p>
              <div className="profile-item-meta">
                <span>{item.scopeType}</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
    </div>
  );
}

function ProfileGeneratedScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const kindFilters = ["总结", "学习指南", "自测", "FAQ", "音频导学", "思维导图"];
  const filters = ["全部", "已转正式", "来源不可访问", ...kindFilters.filter((item) => generatedItems.some((entry) => entry.kind === item))];
  const items = generatedItems.filter((item) => {
    if (activeFilter === "全部") return true;
    if (["已转正式", "来源不可访问"].includes(activeFilter)) return item.status === activeFilter;
    return item.kind === activeFilter;
  });

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="生成内容"
        subtitle="保留原归属，不自动转成企业共享内容"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className="profile-item-card"
            onClick={() => onToast(`查看生成内容：${item.title}`)}
          >
            <div className="profile-item-mark">
              {item.kind === "音频导学" ? <Headphones size={20} /> : <Sparkle size={20} />}
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.scope}</p>
              <div className="profile-item-meta">
                <span>{item.kind}</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
    </div>
  );
}

function ProfileSavedScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "企业资料", "课程", "网页", "来源不可访问"];
  const items = savedItems.filter((item) => activeFilter === "全部" || item.status === activeFilter);

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="收藏资料"
        subtitle="只保留个人快捷入口，不单独做一级导航"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`profile-item-card ${item.status === "来源不可访问" ? "disabled" : ""}`}
              onClick={() => {
                if (item.status === "来源不可访问") {
                  onToast("原内容已不可访问，仅保留收藏痕迹");
                  return;
                }
                onToast(`打开收藏内容：${item.title}`);
              }}
            >
              <div className="profile-item-mark">
                <Icon size={20} />
              </div>
              <div className="profile-item-main">
                <div className="profile-item-head">
                  <strong>{item.title}</strong>
                  <span className="item-pill">{item.status}</span>
                </div>
                <p>{item.scope}</p>
                <div className="profile-item-meta">
                  <span>{item.kind}</span>
                  <span>{item.updated}</span>
                </div>
              </div>
              <CaretRight size={18} />
            </button>
          );
        })}
      </section>
    </div>
  );
}

function ProfileDownloadsScreen({ onBack, onToast }) {
  const [activeFilter, setActiveFilter] = useState("全部");
  const filters = ["全部", "可离线", "权限已变更"];
  const sortedItems = [...downloadItems].sort((left, right) => {
    if (left.status === "权限已变更" && right.status !== "权限已变更") return -1;
    if (left.status !== "权限已变更" && right.status === "权限已变更") return 1;
    return 0;
  });
  const items = sortedItems.filter((item) => activeFilter === "全部" || item.status === activeFilter);

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="下载管理"
        subtitle="设备维护页，不作为学习资产归档页"
        onBack={onBack}
      />
      <FilterRow items={filters} value={activeFilter} onChange={setActiveFilter} />
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className={`profile-item-card ${item.status === "权限已变更" ? "disabled" : ""}`}
            onClick={() => {
              if (item.status === "权限已变更") {
                onToast("该下载项权限已变更，请删除本地缓存");
                return;
              }
              if (item.status === "下载失败") {
                onToast("该下载项失败，可稍后重试");
                return;
              }
              onToast(`打开离线内容：${item.title}`);
            }}
          >
            <div className="profile-item-mark">
              <Files size={20} />
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.size}</p>
              <div className="profile-item-meta">
                <span>最近下载</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
    </div>
  );
}

function ProfileAdoptionsScreen({ onBack, onToast }) {
  const [statusFilter, setStatusFilter] = useState("全部");
  const [typeFilter, setTypeFilter] = useState("全部");
  const typeFilters = ["全部", "个人资料", "AI回答", "生成内容", "自测候选"];
  const statusFilters = ["全部", "处理中", "已提交", "未采纳", "已采纳"];
  const items = adoptionItems.filter((item) => {
    const statusMatches = statusFilter === "全部" || item.status === statusFilter;
    const typeMatches = typeFilter === "全部" || item.type === typeFilter;
    return statusMatches && typeMatches;
  });

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="建议采纳记录"
        subtitle="保留状态痕迹，不支持主动撤回"
        onBack={onBack}
      />
      <div className="dual-filter">
        <FilterRow items={statusFilters} value={statusFilter} onChange={setStatusFilter} />
        <FilterRow items={typeFilters} value={typeFilter} onChange={setTypeFilter} />
      </div>
      <section className="profile-card-stack">
        {items.map((item) => (
          <button
            key={item.id}
            className="profile-item-card"
            onClick={() => onToast(`进入采纳记录：${item.title}`)}
          >
            <div className="profile-item-mark">
              <Flag size={20} />
            </div>
            <div className="profile-item-main">
              <div className="profile-item-head">
                <strong>{item.title}</strong>
                <span className="item-pill">{item.status}</span>
              </div>
              <p>{item.scope}</p>
              <div className="profile-item-meta">
                <span>{item.type}</span>
                <span>{item.summary}</span>
                <span>{item.updated}</span>
              </div>
            </div>
            <CaretRight size={18} />
          </button>
        ))}
      </section>
      <button className="secondary-action" onClick={() => onToast("同一份未变更内容不会重复建单，进入原记录查看处理状态")}>
        <Info size={18} />
        相同内容不重复提交采纳
      </button>
    </div>
  );
}

function ProfileMessagesScreen({ onBack, onToast, onNavigate }) {
  const [readFilter, setReadFilter] = useState("全部");
  const [typeFilter, setTypeFilter] = useState("全部");
  const typeFilters = ["全部", "学习", "考试", "陪练", "待复习", "采纳反馈", "权限与下载"];
  const items = messageItems.filter((item) => {
    const readMatches = readFilter === "全部" || item.unread;
    const typeMatches = typeFilter === "全部" || item.type === typeFilter;
    return readMatches && typeMatches;
  });

  const iconByType = {
    学习: Books,
    考试: Exam,
    陪练: Microphone,
    待复习: BookmarkSimple,
    采纳反馈: Flag,
    "权限与下载": WarningCircle,
  };

  return (
    <div className="page profile-page">
      <ProfileHeader
        title="消息"
        subtitle="只做提醒和跳转，不在这里展开业务详情"
        onBack={onBack}
      />
      <div className="dual-filter">
        <div className="segmented short">
          {["全部", "未读"].map((item) => (
            <button
              key={item}
              className={readFilter === item ? "active" : ""}
              onClick={() => setReadFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <FilterRow items={typeFilters} value={typeFilter} onChange={setTypeFilter} />
      </div>
      <section className="profile-card-stack">
        {items.map((item) => {
          const Icon = iconByType[item.type] ?? Info;
          const fallbackMessage =
            item.type === "采纳反馈"
              ? "进入建议采纳记录详情"
              : item.type === "待复习"
                ? "进入待复习列表"
                : `进入：${item.title}`;

          return (
            <button
              key={item.id}
              className="profile-item-card message"
              onClick={() => onNavigate(item.target, fallbackMessage)}
            >
              <div className="profile-item-mark">
                <Icon size={20} />
              </div>
              <div className="profile-item-main">
                <div className="profile-item-head">
                  <strong>{item.title}</strong>
                  {item.unread ? <span className="item-dot" /> : null}
                </div>
                <p>{item.summary}</p>
                <div className="profile-item-meta">
                  <span>{item.type}</span>
                  <span>{item.updated}</span>
                </div>
              </div>
              <CaretRight size={18} />
            </button>
          );
        })}
      </section>
      {!items.length && (
        <div className="empty-state compact">
          <strong>暂无消息</strong>
          <p>筛选条件下没有可展示的提醒。</p>
        </div>
      )}
      <button className="secondary-action" onClick={() => onToast("消息打开后即视为已读")}>
        <Info size={18} />
        打开消息后自动标记已读
      </button>
    </div>
  );
}

function ProfileDrawer({ onClose, onOpenAssets, onOpenReviews, onOpenMaterials, onOpenDownloads, onOpenMessages, onToast }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="profile-drawer" onClick={(event) => event.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}><X size={22} /></button>
        <div className="profile-head">
          <div className="profile-avatar">林</div>
          <div>
            <h2>林澈</h2>
            <p>华东一区 / 杭州旗舰店 · 家居顾问</p>
          </div>
        </div>
        <div className="profile-grid">
          <span><strong>34</strong>问答历史</span>
          <span><strong>12</strong>生成内容</span>
          <span><strong>9</strong>自测记录</span>
          <span><strong>7</strong>待复习</span>
        </div>
        <div className="drawer-priority-list">
          <button className="drawer-priority-card strong" onClick={onOpenReviews}>
            <BookmarkSimple size={18} />
            <div>
              <strong>待复习</strong>
              <span>7 项来自 3 个学习空间</span>
            </div>
          </button>
          <button className="drawer-priority-card" onClick={onOpenMessages}>
            <Info size={18} />
            <div>
              <strong>消息</strong>
              <span>3 条未读提醒</span>
            </div>
          </button>
          <button className="drawer-priority-card" onClick={onOpenDownloads}>
            <WarningCircle size={18} />
            <div>
              <strong>权限变化</strong>
              <span>1 个下载项不可继续打开</span>
            </div>
          </button>
        </div>
        <button className="drawer-row" onClick={onOpenMaterials}><UserCircle size={22} />个人资料<CaretRight size={18} /></button>
        <button className="drawer-row" onClick={onOpenAssets}><Stack size={22} />我的学习资产<CaretRight size={18} /></button>
        <button className="drawer-row" onClick={onOpenDownloads}><Files size={22} />下载管理<CaretRight size={18} /></button>
        <button className="drawer-row" onClick={onOpenMessages}><Info size={22} />消息<CaretRight size={18} /></button>
        <button className="drawer-row" onClick={() => onToast("设置下一轮再细化")}><NotePencil size={22} />设置<CaretRight size={18} /></button>
        <button className="drawer-row danger"><SignOut size={22} />退出登录</button>
      </aside>
    </div>
  );
}

function SourcePanel({ onClose, onToast }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="source-panel" onClick={(event) => event.stopPropagation()}>
        <div className="panel-handle" />
        <h2>添加来源</h2>
        <p>个人上传内容默认仅本人可见，后台可按权限统计并筛选进入企业正式库。</p>
        <button onClick={() => onToast("选择 PDF / 文档 / 图片")}>
          <Files size={23} />上传文件
        </button>
        <button onClick={() => onToast("粘贴网页链接")}>
          <Info size={23} />添加网页链接
        </button>
        <button onClick={() => onToast("粘贴文本内容")}>
          <ClipboardText size={23} />粘贴文本
        </button>
      </aside>
    </div>
  );
}
