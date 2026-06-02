import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { KfzShell } from "@/components/kfz-shell";
import { KfzIcon } from "@/components/kfz-icon";
import { PROCESS_INTRO, PROCESS_STEPS, PROCESS_FAQ, SERVICES, VALUE_ADDS } from "@/data/cases";

export const metadata: Metadata = {
  title: "合作流程｜空房子室內設計",
  description: PROCESS_INTRO.lead,
};

export default function ProcessPage() {
  return (
    <KfzShell>
      <section className="hero">
        <div className="wrap reveal">
          <div className="kicker">{PROCESS_INTRO.kicker}</div>
          <h1 className="serif">{PROCESS_INTRO.title}</h1>
          <p>{PROCESS_INTRO.lead}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="block-head reveal">
          <div className="kicker">SERVICES</div>
          <h2 className="serif">服務項目</h2>
        </div>
        <div className="services">
          {SERVICES.map((s, i) => (
            <div className="svc reveal" key={s.name} style={{ animationDelay: `${i * 0.05}s` }}>
              <KfzIcon name={s.icon} />
              <div className="name serif">{s.name}</div>
            </div>
          ))}
        </div>

        <div className="block-head reveal">
          <div className="kicker">WORKFLOW</div>
          <h2 className="serif">服務流程</h2>
        </div>
        <div className="flow">
          {PROCESS_STEPS.map((s) => (
            <Fragment key={s.no}>
              {s.stage && <div className="stagebar"><span>{s.stage}</span></div>}
              <div className="fstep reveal">
                <div className="fdot en">{s.no}</div>
                <div className="fbody">
                  <h3 className="serif">{s.title}</h3>
                  <div className="time">{s.time}</div>
                  <div className="desc">{s.desc}</div>
                  <div className="kv2"><b>你準備</b> {s.prep}　·　<b>你得到</b> {s.get}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="block-head reveal">
          <div className="kicker">PROMISE</div>
          <h2 className="serif">我們的承諾</h2>
        </div>
        <div className="values">
          {VALUE_ADDS.map((v, i) => (
            <div className="val reveal" key={v.t} style={{ animationDelay: `${i * 0.05}s` }}>
              <KfzIcon name={v.icon} />
              <div>
                <div className="vt">{v.t}</div>
                <div className="vd">{v.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="fee">
          <h4 className="serif">關於費用，我們說清楚</h4>
          <ul style={{ padding: 0, margin: 0 }}>
            <li>初談完全免費，不會在第一次見面就要你付任何錢。</li>
            <li>設計與工程分兩階段簽約：先簽設計、確認滿意，再進工程估價與簽約。每一筆你都清楚，也保留每階段喊停的主導權。</li>
            <li>付款分階段，跟著進度走，而不是一次付清。</li>
          </ul>
        </div>
        <div className="faq">
          {PROCESS_FAQ.map((f) => (
            <div key={f.q}>
              <div className="q serif">{f.q}</div>
              <div className="a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="cta">
        <div className="wrap">
          <h2 className="serif">準備好聊聊了嗎？</h2>
          <p>不用先想好所有答案，也不用先準備設計圖。你只要願意把對家的想像說出來，我們就能開始。</p>
          <Link className="btn" href="/design">預約免費初談</Link>
        </div>
      </section>
    </KfzShell>
  );
}
