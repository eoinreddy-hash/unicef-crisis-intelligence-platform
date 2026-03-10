import { assistantInsights, chatMessages, chatPrompts } from "@/lib/mock-data";

export function AIAssistantPanel() {
  return (
    <div className="panel flex h-full flex-col p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-kicker">AI Assistant</p>
          <h3 className="section-title">Decision support copilot</h3>
        </div>
        <div className="rounded-full border border-unicef-blue/20 bg-unicef-blue/10 px-3 py-1 text-xs font-semibold text-unicef-blue shadow-[0_10px_28px_rgba(28,171,226,0.15)]">
          UNICEF verified context
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {assistantInsights.map((item) => (
          <div key={item.label} className="card-subtle bg-unicef-mist/45 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-unicef-ink/42">{item.label}</div>
            <div className="mt-2 text-lg font-semibold text-unicef-ink">{item.value}</div>
            <div className="mt-1 text-sm text-unicef-ink/58">{item.detail}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex-1 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={`${message.title}-${index}`}
            className={`max-w-[92%] rounded-[22px] px-4 py-3.5 shadow-[0_14px_30px_rgba(15,39,65,0.05)] ${
              message.role === "assistant"
                ? "border border-unicef-blue/15 bg-[linear-gradient(180deg,_#F6FCFE,_#EFF8FC)] text-unicef-ink"
                : "ml-auto border border-white/80 bg-white text-unicef-ink/80"
            }`}
          >
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-unicef-ink/45">
              {message.title}
            </div>
            <p className="text-sm leading-6">{message.body}</p>
          </div>
        ))}
        <div className="max-w-[70%] rounded-[22px] border border-unicef-blue/15 bg-[linear-gradient(180deg,_#F6FCFE,_#EFF8FC)] px-4 py-3 shadow-[0_14px_30px_rgba(15,39,65,0.05)]">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-unicef-ink/45">
            UNICEF Crisis AI
          </div>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-unicef-blue/45" />
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-unicef-blue/45 [animation-delay:120ms]" />
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-unicef-blue/45 [animation-delay:240ms]" />
          </div>
        </div>
      </div>

      <div className="card-subtle mt-6 bg-unicef-mist/52 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-unicef-ink/45">
          Example prompts
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {chatPrompts.map((prompt) => (
            <button
              key={prompt}
              className="soft-ring rounded-full bg-white/94 px-3 py-2 text-left text-sm text-unicef-ink transition duration-300 hover:-translate-y-0.5 hover:bg-[#F3FBFE]"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="soft-ring mt-4 rounded-[18px] bg-white/92 px-4 py-3 text-sm text-unicef-ink/55">
          Ask about crisis severity, immediate needs, access constraints, or regional prioritization.
        </div>
      </div>
    </div>
  );
}
