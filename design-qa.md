# Design QA

source visual truth path: `/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/reference/source-visual.png`

implementation screenshot path: `/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/chat-final.png`

viewport: `393 x 852`

state: 企业LM AI 对话页，当前学习空间为“全屋定制产品知识库”，左侧 `+` 浮层打开。

full-view comparison evidence: `/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/chat-comparison-latest.png`

additional implementation evidence:

- 首页：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/home-final.png`
- 学习空间详情：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/detail-final.png`
- 生成总结态：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/generated-final.png`
- 权限失效来源轻提示：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/disabled-source-final.png`
- 课程筛选继续学习：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/filter-course-resume.png`
- 资料筛选继续学习：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/filter-resource-resume.png`
- 专题筛选继续学习：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/filter-topic-resume.png`
- 内训工作台 Tab：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/workbench-tab.png`
- 陪练 Tab：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-tab.png`
- 陪练录音流程：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session.png`
- 陪练重录态：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-recorded.png`
- 陪练建议：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-report.png`
- 陪练进行页按原版原型对齐后：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session-original-aligned.png`
- 陪练语音识别态：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session-after-speech.png`
- 陪练发送后对话流：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session-sent.png`
- 陪练结束确认弹层：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session-exit-sheet.png`
- 考试 Tab：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-tab.png`
- 考试单选题作答：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-taking-choice.png`
- 考试演讲题作答：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-taking-speech.png`
- 考试演讲题重录态：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-speech-recorded.png`
- 考试结果：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-report.png`

focused region comparison evidence: not separated; the full-view comparison is readable enough for header, context strip, answer card, source rows, left `+` menu, and composer.

**Findings**

- No actionable P0/P1/P2 findings remain.

**Checked Surfaces**

- Fonts and typography: chat page now uses the accepted smaller type scale. Homepage and detail page were also reduced so headings, cards, list rows, source rows, bottom tabs, and CTAs no longer feel oversized compared with the chat baseline.
- Spacing and layout rhythm: homepage, detail, and chat were captured at `393 x 852`. The homepage AI entry now sits as a bottom capability instead of interrupting the learning-space list. Detail hero, stats, source rows, and CTA were compressed to the same density as the chat screen.
- Colors and visual tokens: white base, soft gray surfaces, teal active states, green source-status pills, gray disabled source rows, and orange warning state are consistent across the prototype.
- Image quality and asset fidelity: no raster product imagery is required for these screens. Icons use `@phosphor-icons/react`; no handcrafted SVG/CSS drawings are used for the visible icon system.
- Copy and content: visible UI copy follows the confirmed 企业LM flow: learning spaces, current scope, source stats, cited answer, disabled source, answer actions, AI disclaimer, left `+` menu, generated summary, profile drawer, and source-management entry.

**Patches Made Since Previous QA Pass**

- Reduced homepage density: header controls, search, segmented filter, review prompt, continue-learning cards, learning-space rows, progress bars, bottom tabs, and bottom AI entry.
- Fixed homepage AI entry positioning so it is bottom-fixed above the tab bar rather than visually reading as a list item.
- Reduced detail density: hero heading, status badges, description text, stats, CTA, source rows, recommendation rows, and bottom tabs.
- Preserved the accepted smaller AI chat scale after the homepage/detail changes.
- Verified generated summary action and disabled-source light toast in browser.
- Fixed the homepage filter interaction so the continue-learning cards change with `全部 / 课程 / 资料 / 专题`, then captured each filtered state in browser.
- Made the bottom navigation interactive across `内训工作台 / 企业LM / 陪练 / 考试`.
- Added `内训工作台` as a light operational landing page with pending learning, practice, exam, and review entry points.
- Added a complete lightweight `陪练` flow: scenario list, full-screen recording session, unlimited re-record state, and suggestion report. Practice entry does not show a score by default.
- Added a complete lightweight `考试` flow: exam list, countdown taking page, single-choice question, `演讲题` recording, re-record state, and configurable result page. The taking page does not show score.
- Hidden bottom navigation during active recording and exam-taking flows to avoid accidental navigation while answering.
- Reworked the `陪练` active session after checking the original prototype: it now follows the original continuous AI conversation model with face/expression recognition context, progress, AI question bubbles, speech-recognition preview, `按住说话`, speaking feedback, and end-confirmation sheet instead of static per-round recording cards.

**Follow-up Polish**

- P3: the generated visual target is still slightly airier than the coded chat card in places; this is acceptable for the functional prototype and can be tuned later.
- P3: icon shapes differ from the generated target because the prototype uses a real icon library for consistency and maintainability.

final result: passed

## 2026-06-23 Practice And Exam Alignment Pass

scope: 参考原移动端原型，对 `陪练` 和 `考试` 正式流程做第二轮对齐，重点检查正式任务流的沉浸感、底部导航干扰、考试验证页、以及单选题切到 `演讲题` 时的对话状态连续性。

evidence:

- 陪练详情（隐藏底部 Tab 后）：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-detail-fixed.png`
- 角色确认（隐藏底部 Tab 后）：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-role-fixed.png`
- 陪练进行页：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/practice-session-fixed.png`
- 考试验证页：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-verify-fixed.png`
- 考试验证页文案清理后：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-verify-copy-fixed.png`
- 考试单选题：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-choice-fixed.png`
- 考试单选题已提交：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-choice-submitted-fixed.png`
- 考试演讲题：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-speech-fixed.png`
- 考试演讲题已转写：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-speech-recorded-fixed.png`
- 考试结果页文案清理后：`/Users/zhoukeyu/Desktop/内训师V1.2 - 内部/prototypes/enterprise-lm-mobile-v2/output/playwright/exam-report-copy-fixed.png`

findings:

- 已修复：`陪练详情`、`角色确认` 进入正式任务流后不再显示底部主导航，底部 CTA 与正式答题态一致。
- 已修复：考试从单选题切换到 `演讲题` 后，不再把上一题的已选答案错误挂在当前题对话区。
- 已修复：员工端考试链路中的“后台配置 / 管理员可配置”表述已改成用户视角的规则文案，避免把管理后台逻辑直接暴露给员工。
- 当前无新的 P1 / P2 级设计问题；练习与考试两条链路均已在浏览器中完整走通。
