import type { Metadata } from "next"
import { HomeNavbar } from "@/components/home-navbar"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "隱私權政策｜裕綸集團 Yulun Group",
  description: "裕綸集團隱私權政策：說明我們如何蒐集、使用與保護您在本網站提供的個人資料。",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-light tracking-wider text-[#2F2F2F]">{title}</h2>
      <div className="space-y-3 text-[15px] font-light leading-relaxed text-[#4A4A4A]">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main className="bg-[#F5EFE6]">
      <HomeNavbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40">
        <p className="mb-2 text-xs font-light uppercase tracking-[0.4em] text-[#6B4E31]">Privacy Policy</p>
        <h1 className="mb-4 text-3xl font-light tracking-wider text-[#2F2F2F] md:text-4xl">隱私權政策</h1>
        <p className="mb-12 text-sm font-light text-[#777]">最後更新日期：2026 年 6 月</p>

        <p className="mb-12 text-[15px] font-light leading-relaxed text-[#4A4A4A]">
          裕綸集團（以下簡稱「本公司」）非常重視您的隱私。當您使用本網站（www.yulungroup.com）並提供個人資料時，
          本政策說明我們如何蒐集、使用、保護與處理您的資料。請您於使用本網站服務前詳細閱讀。
        </p>

        <Section title="一、我們蒐集的資料">
          <p>當您透過本網站的「預約諮詢／立即報價」表單與我們聯繫時，我們會蒐集您主動填寫的資料，可能包括：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>姓名</li>
            <li>聯絡電話</li>
            <li>有興趣的服務、預算金額與需求說明</li>
            <li>電子郵件（如您提供）</li>
          </ul>
          <p>
            此外，當您瀏覽本網站時，我們的分析與廣告工具（詳見第四點）可能會自動蒐集非個人化的瀏覽資訊，
            例如瀏覽頁面、停留時間、裝置類型與來源管道。
          </p>
        </Section>

        <Section title="二、蒐集目的與利用方式">
          <p>我們蒐集您的個人資料，目的在於：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>回覆您的諮詢、提供室內設計與裝修工程之說明與報價</li>
            <li>安排專人與您聯繫、後續溝通與服務</li>
            <li>改善本網站內容與服務品質</li>
          </ul>
          <p>本公司不會將您的個人資料用於上述目的以外之用途，亦不會販售或任意提供予無關之第三方。</p>
        </Section>

        <Section title="三、資料的儲存與保護">
          <p>
            您透過表單提交的資料，將儲存於本公司使用之雲端服務（Google）中，並僅由本公司授權之人員存取，
            用於與您聯繫之目的。我們採取合理之技術與管理措施，保護您的個人資料免於遺失、竊取或未經授權之存取。
          </p>
        </Section>

        <Section title="四、Cookie 與第三方分析、廣告工具">
          <p>為了解網站使用情形並進行行銷，本網站使用下列第三方工具，這些工具可能透過 Cookie 蒐集匿名的瀏覽行為資料：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong className="font-medium">Google Analytics（GA4）</strong>：分析網站流量與使用行為。
            </li>
            <li>
              <strong className="font-medium">Meta（Facebook）像素</strong>：衡量廣告成效並進行再行銷。
            </li>
            <li>
              <strong className="font-medium">Vercel Analytics</strong>：網站效能與流量統計。
            </li>
          </ul>
          <p>
            這些工具蒐集的是去識別化／彙總性的資料，用於分析與廣告衡量。您可透過瀏覽器設定關閉 Cookie，
            或於各服務商之設定中管理您的廣告偏好。
          </p>
        </Section>

        <Section title="五、您的權利">
          <p>就本公司保有之您的個人資料，您得依個人資料保護法行使下列權利：</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>查詢、閱覽或請求製給複本</li>
            <li>請求補充或更正</li>
            <li>請求停止蒐集、處理、利用或請求刪除</li>
          </ul>
          <p>如您欲行使上述權利，請透過下方聯絡方式與我們聯繫。</p>
        </Section>

        <Section title="六、政策修訂">
          <p>
            本公司保留隨時修訂本隱私權政策之權利。修訂後之內容將公布於本網站，並以更新「最後更新日期」之方式提示。
          </p>
        </Section>

        <Section title="七、聯絡我們">
          <p>如您對本隱私權政策有任何疑問，歡迎與我們聯繫：</p>
          <ul className="space-y-1">
            <li>地址：台中市北屯區瀋陽北路 73 號</li>
            <li>
              電話：<a href="tel:+886-4-2247-9068" className="text-[#6B4E31] hover:underline">04-2247-9068</a>
            </li>
            <li>
              Email：
              <a href="mailto:yulun83417215@gmail.com" className="text-[#6B4E31] hover:underline">
                yulun83417215@gmail.com
              </a>
            </li>
          </ul>
        </Section>
      </div>

      <SiteFooter />
    </main>
  )
}
