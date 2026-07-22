import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { KfzShell } from "@/components/kfz-shell";
import { TODO } from "@/data/cases";
import { getCaseBySlugServer } from "@/lib/works-server";

// Read fresh from the CMS on each request so backend edits show immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseBySlugServer(slug);
  if (!c) return { title: "案例｜台中室內設計－空房子室內設計" };
  const url = `https://www.yulungroup.com/works/${slug}`;
  const description = `${c.tagline}。台中${c.cat}案例，由空房子室內設計 × 裕綸室內裝修打造。`;
  return {
    title: `${c.zhName} ${c.enName}｜台中室內設計案例－空房子室內設計`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "zh_TW",
      url,
      siteName: "裕綸集團 Yulun Group",
      title: `${c.zhName}｜台中室內設計案例－空房子室內設計`,
      description,
      images: c.hero ? [c.hero] : [],
    },
  };
}

// Renders 〔待補〕 placeholders in the muted style; otherwise plain text.
function Txt({ v }: { v: string }) {
  return v === TODO ? <span className="todo-txt">{v}</span> : <>{v}</>;
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseBySlugServer(slug);
  if (!c) notFound();

  const hasGallery = c.gallery && c.gallery.length > 0;
  const [feat, ...rest] = hasGallery ? c.gallery : [null];

  const caseUrl = `https://www.yulungroup.com/works/${slug}`;
  const images = [c.hero, ...(hasGallery ? c.gallery.map((g) => g.src) : [])].filter(Boolean);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.yulungroup.com/" },
      { "@type": "ListItem", position: 2, name: "作品案例", item: "https://www.yulungroup.com/works" },
      { "@type": "ListItem", position: 3, name: `${c.zhName} ${c.enName}`.trim() },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.zhName} ${c.enName}｜台中室內設計案例`.trim(),
    description: c.tagline,
    ...(images.length ? { image: images } : {}),
    articleSection: c.cat,
    inLanguage: "zh-TW",
    mainEntityOfPage: caseUrl,
    author: { "@type": "Organization", name: "空房子室內設計", url: "https://www.yulungroup.com/design" },
    publisher: {
      "@type": "Organization",
      name: "裕綸集團",
      logo: { "@type": "ImageObject", url: "https://www.yulungroup.com/icon-512.png" },
    },
  };

  return (
    <KfzShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <div className="wrap">
        <Link className="back" href="/works">← 回案例列表</Link>
      </div>

      <section className="case-hero">
        {c.hero ? (
          <Image src={c.hero} alt={c.zhName} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className="ph">［ 主視覺待補 ］</div>
        )}
        <div className="cap">
          <div className="en-name">{c.enName}</div>
          <h1>{c.zhName}</h1>
          <div className="tag">{c.tagline}</div>
        </div>
      </section>

      <div className="wrap">
        <div className="meta">
          <span className="cat">{c.cat}</span>
          {c.meta.map((m) => <span key={m}>{m}</span>)}
        </div>

        <div className="sec reveal">
          <div className="lab">The Story</div>
          <h2 className="serif">使用者的故事</h2>
          <p><Txt v={c.story} /></p>
        </div>

        <div className="sec reveal">
          <div className="lab">The Problem</div>
          <h2 className="serif">原本的難題</h2>
          <p><Txt v={c.problem} /></p>
        </div>

        <div className="sec reveal">
          <div className="lab">Our Approach</div>
          <h2 className="serif">我們的解法</h2>
          <p><Txt v={c.solution} /></p>
          <div style={{ marginTop: 20 }}>
            {c.highlights.map((h, i) => (
              <div className="hl" key={i}>
                <b className="en">0{i + 1}</b>
                <span><Txt v={h} /></span>
              </div>
            ))}
          </div>
        </div>

        {hasGallery && feat ? (
          <div className="sec reveal gallery">
            <div className="lab">The Result</div>
            <h2 className="serif">完工實景</h2>
            <figure className="feat">
              <Image src={feat.src} alt={feat.caption} width={1600} height={1067} sizes="(max-width:980px) 100vw, 980px" style={{ width: "100%", height: "auto" }} />
              <figcaption>{feat.caption}</figcaption>
            </figure>
            <div className="grid">
              {rest.map((g, i) => (
                <figure key={i}>
                  <div className="imgbox">
                    <Image src={g!.src} alt={g!.caption} fill sizes="(max-width:640px) 100vw, 320px" style={{ objectFit: "cover" }} />
                  </div>
                  <figcaption>{g!.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className="sec reveal">
            <div className="lab">The Result</div>
            <h2 className="serif">完工實景</h2>
            <p className="todo-txt">〔待補：完工照片與說明〕</p>
          </div>
        )}
      </div>

      <section className="cta">
        <div className="wrap">
          <h2 className="serif">喜歡這個空間的感覺嗎？</h2>
          <p>每個空間都有自己的故事。也來聊聊你的需求，我們一起把它寫出來。</p>
          <Link className="btn" href="/design">預約免費初談</Link>
        </div>
      </section>
    </KfzShell>
  );
}
