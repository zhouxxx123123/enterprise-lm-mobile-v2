import { useMemo, useState } from "react";
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

const tabForScreen = (screen) => {
  if (["home", "detail", "chat"].includes(screen)) return "企业LM";
  if (["practice", "practice-detail", "practice-role", "practice-session", "practice-report"].includes(screen)) return "陪练";
  if (["exam", "exam-verify", "exam-taking", "exam-report"].includes(screen)) return "考试";
  return "内训工作台";
};

export function App() {
  const [screen, setScreen] = useState("home");
  const [filter, setFilter] = useState("全部");
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [generated, setGenerated] = useState(null);
  const [toast, setToast] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sourcePanel, setSourcePanel] = useState(false);

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
    setIsMenuOpen(true);
  };

  const hideBottomTabs = ["chat", "practice-detail", "practice-role", "practice-session", "exam-verify", "exam-taking"].includes(screen);

  const switchTab = (tab) => {
    setProfileOpen(false);
    setSourcePanel(false);
    setToast("");
    setGenerated(null);
    setIsMenuOpen(true);

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
            onProfile={() => setProfileOpen(true)}
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
            onProfile={() => setProfileOpen(true)}
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
            onStart={() => setScreen("practice-detail")}
            onReport={() => setScreen("practice-report")}
            onToast={showToast}
          />
        )}

        {screen === "practice-detail" && (
          <PracticeDetailScreen
            onBack={() => setScreen("practice")}
            onStart={() => setScreen("practice-role")}
          />
        )}

        {screen === "practice-role" && (
          <PracticeRoleScreen
            onBack={() => setScreen("practice-detail")}
            onStart={() => setScreen("practice-session")}
            onToast={showToast}
          />
        )}

        {screen === "practice-session" && (
          <PracticeSessionScreen
            onBack={() => setScreen("practice-role")}
            onFinish={() => setScreen("practice-report")}
            onToast={showToast}
          />
        )}

        {screen === "practice-report" && (
          <PracticeReportScreen
            onBack={() => setScreen("practice")}
            onChat={goChat}
            onToast={showToast}
          />
        )}

        {screen === "exam" && (
          <ExamScreen
            onStart={() => setScreen("exam-verify")}
            onReport={() => setScreen("exam-report")}
            onToast={showToast}
          />
        )}

        {screen === "exam-verify" && (
          <ExamVerifyScreen
            onBack={() => setScreen("exam")}
            onStart={() => setScreen("exam-taking")}
            onToast={showToast}
          />
        )}

        {screen === "exam-taking" && (
          <ExamTakingScreen
            onBack={() => setScreen("exam-verify")}
            onFinish={() => setScreen("exam-report")}
            onToast={showToast}
          />
        )}

        {screen === "exam-report" && (
          <ExamReportScreen
            onBack={() => setScreen("exam")}
            onToast={showToast}
          />
        )}

        {!hideBottomTabs && <BottomTabs active={tabForScreen(screen)} onSelect={switchTab} />}

        {profileOpen && <ProfileDrawer onClose={() => setProfileOpen(false)} />}
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

function PracticeScreen({ onStart, onReport, onToast }) {
  return (
    <div className="page practice-page">
      <header className="module-header">
        <div>
          <p className="eyebrow">场景练习 · 不限重录</p>
          <h1>陪练</h1>
        </div>
        <button className="icon-button" onClick={() => onToast("本次练习包含场景、角色和逐轮建议")} aria-label="练习说明">
          <Info size={23} />
        </button>
      </header>

      <section className="flow-card featured">
        <div className="flow-card-head">
          <span>推荐练习</span>
          <em>企业下发</em>
        </div>
        <h2>高意向客户接待陪练</h2>
        <p>围绕预算、环保、交付周期三个异议进行模拟沟通。练习没有倒计时，提交后生成逐题建议。</p>
        <div className="rule-list">
          <span><Microphone size={16} />逐个录音</span>
          <span><CheckCircle size={16} />可重录不限次数</span>
          <span><ShieldCheck size={16} />不支持文本作答</span>
        </div>
        <button className="primary-action" onClick={onStart}>开始陪练</button>
      </section>

      <section className="compact-section">
        <div className="section-heading">
          <h2>最近陪练</h2>
          <button onClick={onReport}>查看建议</button>
        </div>
        <button className="history-row" onClick={onReport}>
          <div className="status-dot done" />
          <div>
            <strong>环保等级解释练习</strong>
            <span>已完成 · 生成 3 条话术建议</span>
          </div>
          <CaretRight size={18} />
        </button>
        <button className="history-row" onClick={onStart}>
          <div className="status-dot pending" />
          <div>
            <strong>售后投诉安抚练习</strong>
            <span>未开始 · 来自售后案例库</span>
          </div>
          <CaretRight size={18} />
        </button>
      </section>
    </div>
  );
}

function PracticeDetailScreen({ onBack, onStart }) {
  return (
    <div className="page practice-detail-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>陪练详情</h1>
          <span>企业下发 · 高意向客户接待</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className="prep-hero">
        <span>场景</span>
        <h2>高意向客户接待</h2>
        <p>客户预算明确，关注儿童房环保，同时担心交付延期。训练目标是先确认需求，再完成价值解释和邀约下一步。</p>
      </section>

      <section className="prep-list">
        <article>
          <strong>训练目标</strong>
          <p>需求确认、环保等级解释、预算异议处理、量尺邀约。</p>
        </article>
        <article>
          <strong>预计时长</strong>
          <p>4 轮对话，约 6 分钟。可重录，不限制次数。</p>
        </article>
        <article>
          <strong>作答方式</strong>
          <p>按住说话完成每轮回应，系统实时转写并生成下一轮追问。</p>
        </article>
      </section>

      <button className="primary-action page-bottom-action" onClick={onStart}>确认场景，选择角色</button>
    </div>
  );
}

function PracticeRoleScreen({ onBack, onStart, onToast }) {
  return (
    <div className="page practice-role-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>角色确认</h1>
          <span>开始前确认 AI 扮演对象</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className="role-card selected">
        <div className="role-avatar">客</div>
        <div>
          <strong>价格敏感型客户</strong>
          <p>预算上限清晰，会追问 ENF 级板材、交付周期和优惠空间。</p>
        </div>
        <CheckCircle size={23} weight="fill" />
      </section>

      <section className="prep-list compact">
        <article>
          <strong>追问强度</strong>
          <p>中等。AI 会在回答过泛、没有确认需求时继续追问。</p>
        </article>
        <article>
          <strong>评分重点</strong>
          <p>开场确认、专业解释、客户语言转译、推进下一步。</p>
        </article>
      </section>

      <button className="secondary-action" onClick={() => onToast("当前先展示推荐角色，后续可扩展更多角色")}>查看其他角色</button>
      <button className="primary-action page-bottom-action" onClick={onStart}>开始陪练</button>
    </div>
  );
}

function PracticeSessionScreen({ onBack, onFinish, onToast }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [sentAnswer, setSentAnswer] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  const startHold = () => {
    setIsRecording(true);
  };

  const stopHold = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setHasAnswer(true);
    onToast("语音已识别，可发送或重新按住作答");
  };

  const sendAnswer = () => {
    if (!hasAnswer) {
      onToast("请先按住说话完成作答");
      return;
    }
    setSentAnswer(true);
    onToast("回答已发送，AI 正在生成下一题");
  };

  return (
    <div className="page trainer-session-page">
      <header className="trainer-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>高意向客户接待</h1>
          <span>智能陪练 · 进度 1/4</span>
        </div>
        <button className="plain-icon" onClick={() => setExitOpen(true)} aria-label="结束练习">
          <DotsThree size={26} weight="bold" />
        </button>
      </header>

      <section className="trainer-top">
        <div className="face-card">
          <div className="face-avatar">林</div>
          <span><ShieldCheck size={14} />表情识别中</span>
        </div>
        <div className="trainer-progress">
          <div>
            <strong>当前练习</strong>
            <span>需求确认 · 客户预算异议</span>
          </div>
          <div className="progress-track">
            <i style={{ width: "25%" }} />
          </div>
          <em>进度 25%</em>
        </div>
      </section>

      <section className="trainer-chat-list">
        <div className="trainer-bubble ai">
          <span>1.</span>
          <p>客户说：“预算只有 18 万，但又想儿童房更环保，你们 ENF 级为什么值得加钱？”</p>
        </div>
        {hasAnswer && (
          <div className="trainer-bubble mine">
            <p>我会先确认您更关注孩子长期居住安全，还是整体预算控制，再解释 ENF 的环保释放量要求更严格。</p>
          </div>
        )}
        {sentAnswer && (
          <div className="trainer-bubble ai">
            <span>2.</span>
            <p>回答方向正确。下一步请尝试把“环保释放量”转成客户更容易理解的生活场景。</p>
          </div>
        )}
      </section>

      <section className="trainer-tip-card">
        <div>
          <strong>话术参考：需求确认</strong>
          <button onClick={sendAnswer}>发送</button>
        </div>
        <p>建议先复述客户担心，再追问“儿童房长期居住”和“预算上限”哪个优先。</p>
        <div className={hasAnswer ? "speech-preview filled" : "speech-preview"}>
          {hasAnswer ? "已识别回答，可重新按住说话覆盖当前回答。" : "按住说话后，这里显示语音识别结果。"}
        </div>
      </section>

      {isRecording && (
        <div className="speaking-popover">
          <div>
            <Microphone size={24} weight="fill" />
            <span>说话中…</span>
          </div>
          <div className="speech-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}

      {exitOpen && (
        <div className="trainer-exit-sheet">
          <div>
            <strong>是否结束当前练习？</strong>
            <button onClick={() => setExitOpen(false)}><X size={20} /></button>
          </div>
          <button className="primary-action" onClick={onFinish}>结束并查看报告</button>
          <button className="link-action" onClick={onBack}>直接结束练习</button>
        </div>
      )}

      <div className="hold-talk-area">
        <button
          className={isRecording ? "hold-talk-button recording" : "hold-talk-button"}
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerCancel={() => setIsRecording(false)}
          onPointerLeave={stopHold}
        >
          <Microphone size={22} />
          {isRecording ? "松开结束" : hasAnswer ? "重新按住说话" : "按住说话"}
        </button>
      </div>
    </div>
  );
}

function PracticeReportScreen({ onBack, onChat, onToast }) {
  return (
    <div className="page report-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>陪练建议</h1>
          <span>高意向客户接待</span>
        </div>
        <button className="plain-icon" onClick={() => onToast("已复制建议")} aria-label="复制">
          <Copy size={23} />
        </button>
      </header>

      <section className="report-summary">
        <span>本次建议</span>
        <h2>先确认客户风险，再讲材料价值</h2>
        <p>你的回答能覆盖环保等级，但开头偏快。建议先复述客户担心，再用场景解释 ENF 的意义。</p>
      </section>

      <section className="suggestion-list">
        <article>
          <Flag size={22} />
          <div>
            <strong>第 1 轮建议</strong>
            <p>补一句“您更担心孩子长期居住，还是整体预算超出？”会更自然。</p>
          </div>
        </article>
        <article>
          <BookmarkSimple size={22} />
          <div>
            <strong>待复习</strong>
            <p>环保等级、儿童房场景、预算异议已加入个人待复习。</p>
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

function ExamScreen({ onStart, onReport, onToast }) {
  return (
    <div className="page exam-page">
      <header className="module-header">
        <div>
          <p className="eyebrow">考试任务 · 限时完成</p>
          <h1>考试</h1>
        </div>
        <button className="icon-button" onClick={() => onToast("本场考试包含题目数量、倒计时、续考规则和结果展示说明")} aria-label="考试说明">
          <Info size={23} />
        </button>
      </header>

      <section className="flow-card exam-card">
        <div className="flow-card-head">
          <span>待完成</span>
          <em>明天 18:00 截止</em>
        </div>
        <h2>新品知识考试</h2>
        <p>2 道示例题：单选题和演讲题。考试区别于练习的是限时倒计时和正式结果。</p>
        <div className="rule-list">
          <span><Exam size={16} />限时 20 分钟</span>
          <span><Microphone size={16} />演讲题逐题录音</span>
          <span><ShieldCheck size={16} />默认不可暂停</span>
        </div>
        <button className="primary-action" onClick={onStart}>开始验证</button>
      </section>

      <section className="compact-section">
        <div className="section-heading">
          <h2>历史结果</h2>
          <button onClick={onReport}>查看</button>
        </div>
        <button className="history-row" onClick={onReport}>
          <div className="status-dot done" />
          <div>
            <strong>产品基础知识考试</strong>
            <span>已完成 · 结果默认展示</span>
          </div>
          <CaretRight size={18} />
        </button>
      </section>
    </div>
  );
}

function ExamVerifyScreen({ onBack, onStart, onToast }) {
  const [isChecking, setIsChecking] = useState(false);
  const [verified, setVerified] = useState(false);

  const runVerify = () => {
    setIsChecking(true);
    window.setTimeout(() => {
      setIsChecking(false);
      setVerified(true);
      onToast("识别成功，可以开始考试");
    }, 650);
  };

  return (
    <div className="page verify-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>考试验证</h1>
          <span>新品知识考试</span>
        </div>
        <span className="header-spacer" />
      </header>

      <section className={verified ? "verify-camera verified" : "verify-camera"}>
        <div className="verify-face">
          <UserCircle size={78} weight="fill" />
        </div>
        <span>{isChecking ? "人脸识别中" : verified ? "识别成功" : "您即将进行人脸识别验证"}</span>
      </section>

      <section className="prep-list compact">
        <article>
          <strong>考试规则</strong>
          <p>限时 20 分钟，默认不可暂停。如支持中断续考，系统会在退出时明确提示。</p>
        </article>
        <article>
          <strong>设备检测</strong>
          <p>摄像头、麦克风已就绪。演讲题将按住说话并实时转写。</p>
        </article>
      </section>

      {!verified ? (
        <button className="primary-action page-bottom-action" onClick={runVerify}>
          {isChecking ? "识别中..." : "开始验证"}
        </button>
      ) : (
        <button className="primary-action page-bottom-action" onClick={onStart}>进入考试</button>
      )}
    </div>
  );
}

function ExamTakingScreen({ onBack, onFinish, onToast }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [choiceSubmitted, setChoiceSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechAnswer, setSpeechAnswer] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const isChoice = questionIndex === 0;

  const submitChoice = () => {
    if (!selected) {
      onToast("请选择答案后再提交当前题");
      return;
    }
    setChoiceSubmitted(true);
    onToast("第 1 题已提交");
  };

  const goNextQuestion = () => {
    if (!selected) {
      onToast("请选择答案后再进入下一题");
      return;
    }
    setQuestionIndex(1);
  };

  const stopSpeech = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setSpeechAnswer(true);
    onToast("演讲题录音已转写，可重录或交卷");
  };

  return (
    <div className="page trainer-session-page exam-conversation-page">
      <header className="trainer-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>新品知识考试</h1>
          <span>剩余 18:42 · 第 {questionIndex + 1}/2 题</span>
        </div>
        <button className="plain-icon" onClick={() => setExitOpen(true)} aria-label="交卷">
          <DotsThree size={26} weight="bold" />
        </button>
      </header>

      <section className="trainer-top exam-top">
        <div className="face-card">
          <div className="face-avatar">林</div>
          <span><ShieldCheck size={14} />表情识别中</span>
        </div>
        <div className="trainer-progress">
          <div>
            <strong>考试进行中</strong>
            <span>{isChoice ? "单选题 · 自动判分" : "演讲题 · 录音作答"}</span>
          </div>
          <div className="progress-track">
            <i style={{ width: isChoice ? "50%" : "100%" }} />
          </div>
          <em>{questionIndex + 1}/2 · 剩余 18:42</em>
        </div>
      </section>

      <section className="trainer-chat-list">
        <div className="trainer-bubble ai">
          <span>{questionIndex + 1}.</span>
          <p>{isChoice ? "客户问“ENF 级为什么更贵”，最适合先回应哪一点？" : "请用 60 秒向客户解释 E0 和 ENF 的区别。"}</p>
        </div>
        {isChoice && selected && (
          <div className="trainer-bubble mine">
            <p>{selected}</p>
          </div>
        )}
        {choiceSubmitted && isChoice && (
          <div className="trainer-bubble ai">
            <span>提示</span>
            <p>第 1 题已提交。下一题为演讲题，请按住说话完成录音作答。</p>
          </div>
        )}
        {speechAnswer && !isChoice && (
          <div className="trainer-bubble mine">
            <p>我会先说明 E0 与 ENF 都和环保释放量相关，再强调 ENF 要求更严格，适合儿童房、老人房等敏感场景。</p>
          </div>
        )}
      </section>

      {isChoice ? (
        <section className="trainer-tip-card exam-answer-card">
          <div>
            <strong>单选题</strong>
            <button onClick={submitChoice}>{choiceSubmitted ? "已提交" : "提交当前题"}</button>
          </div>
          <div className="choice-list conversation-choice-list">
            {["直接说成本更高", "先解释环保释放量要求更严格", "建议客户换低价板材", "只强调品牌活动优惠"].map((choice) => (
              <button
                key={choice}
                className={selected === choice ? "selected" : ""}
                onClick={() => setSelected(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          <button className="secondary-inline-action" onClick={goNextQuestion}>下一题</button>
        </section>
      ) : (
        <section className="trainer-tip-card">
          <div>
            <strong>演讲题作答</strong>
            <button onClick={() => speechAnswer ? onFinish() : onToast("请先按住说话完成录音")}>交卷</button>
          </div>
          <p>不支持文本作答，不支持图片上传。录音可重录，提交后会直接出结果，或进入人工复核。</p>
          <div className={speechAnswer ? "speech-preview filled" : "speech-preview"}>
            {speechAnswer ? "录音已转写，可重新按住说话覆盖当前回答。" : "按住说话后，这里显示演讲题转写结果。"}
          </div>
        </section>
      )}

      {isRecording && (
        <div className="speaking-popover">
          <div>
            <Microphone size={24} weight="fill" />
            <span>说话中…</span>
          </div>
          <div className="speech-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}

      {exitOpen && (
        <div className="trainer-exit-sheet">
          <div>
            <strong>是否交卷？</strong>
            <button onClick={() => setExitOpen(false)}><X size={20} /></button>
          </div>
          <button className="primary-action" onClick={onFinish}>确认交卷</button>
          <button className="link-action" onClick={() => setExitOpen(false)}>返回检查</button>
        </div>
      )}

      {!isChoice && (
        <div className="hold-talk-area">
          <button
            className={isRecording ? "hold-talk-button recording" : "hold-talk-button"}
            onPointerDown={() => setIsRecording(true)}
            onPointerUp={stopSpeech}
            onPointerCancel={() => setIsRecording(false)}
            onPointerLeave={stopSpeech}
          >
            <Microphone size={22} />
            {isRecording ? "松开结束" : speechAnswer ? "重新按住说话" : "按住说话"}
          </button>
        </div>
      )}
    </div>
  );
}

function ExamReportScreen({ onBack, onToast }) {
  return (
    <div className="page report-page">
      <header className="flow-header">
        <button className="plain-icon" onClick={onBack} aria-label="返回">
          <CaretLeft size={30} />
        </button>
        <div>
          <h1>考试结果</h1>
          <span>新品知识考试</span>
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

function ProfileDrawer({ onClose }) {
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
        <button className="drawer-row"><UserCircle size={22} />个人资料<CaretRight size={18} /></button>
        <button className="drawer-row"><UploadSimple size={22} />个人上传<CaretRight size={18} /></button>
        <button className="drawer-row"><NotePencil size={22} />建议采纳记录<CaretRight size={18} /></button>
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
