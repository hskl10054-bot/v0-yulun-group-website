// Shared style block for the 空房子室內設計 (kfz) pages — 合作流程 / 案例.
// Lifted verbatim from the original single-file design; the preview-only
// `.switch` toggle is dropped and a sticky topbar + footer added so the
// standalone pages match the brand-page nav convention.
export function KfzStyles() {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;500;700&family=Noto+Sans+TC:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
    .kfz { --cream:#FFFFFF; --paper:#FFFDF9; --ink:#2B2722; --muted:#8A8074; --line:#E5DCCD; --clay:#A8744F; --clay-soft:#C9A487;
           font-family:'Noto Sans TC',sans-serif; color:var(--ink); background:var(--cream); line-height:1.8; }
    .kfz *{box-sizing:border-box;}
    .kfz .serif{font-family:'Noto Serif TC',serif;}
    .kfz .en{font-family:'Cormorant Garamond',serif; letter-spacing:.04em;}
    .kfz .wrap{max-width:980px;margin:0 auto;padding:0 28px;}
    .kfz .kicker{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--clay);letter-spacing:.12em;margin-bottom:14px;}
    .kfz .reveal{opacity:0;transform:translateY(22px);animation:rise .9s cubic-bezier(.2,.7,.2,1) forwards;}
    @keyframes rise{to{opacity:1;transform:none;}}
    .kfz .hero{padding:120px 0 80px;text-align:center;}
    .kfz .hero h1{font-size:clamp(30px,5vw,52px);font-weight:500;line-height:1.4;margin:0 0 28px;}
    .kfz .hero p{max-width:640px;margin:0 auto;color:var(--muted);font-weight:300;font-size:17px;}
    .kfz .stage-tag{display:inline-block;font-size:13px;letter-spacing:.2em;color:var(--clay);border:1px solid var(--clay-soft);border-radius:999px;padding:5px 18px;margin:48px 0 8px;}
    .kfz .step{display:grid;grid-template-columns:88px 1fr;gap:28px;padding:38px 0;border-bottom:1px solid var(--line);}
    .kfz .step .no{font-family:'Cormorant Garamond',serif;font-size:46px;color:var(--clay-soft);line-height:1;}
    .kfz .step h3{font-size:23px;font-weight:500;margin:0 0 4px;}
    .kfz .step .time{font-size:13px;color:var(--clay);letter-spacing:.08em;margin-bottom:14px;}
    .kfz .step .desc{color:#5b5349;font-weight:300;margin-bottom:18px;}
    .kfz .kv{display:flex;gap:10px;font-size:14px;margin-top:6px;}
    .kfz .kv b{color:var(--clay);font-weight:500;flex:0 0 auto;}
    .kfz .kv span{color:var(--muted);font-weight:300;}
    .kfz .fee{background:var(--paper);border:1px solid var(--line);border-radius:4px;padding:40px;margin:60px 0;}
    .kfz .fee h4{font-size:20px;font-weight:500;margin:0 0 18px;}
    .kfz .fee li{list-style:none;padding:10px 0 10px 24px;position:relative;color:#5b5349;font-weight:300;border-bottom:1px dashed var(--line);}
    .kfz .fee li:last-child{border:0;}
    .kfz .fee li:before{content:"—";position:absolute;left:0;color:var(--clay);}
    .kfz .faq{padding:20px 0 40px;}
    .kfz .faq .q{font-size:18px;font-weight:500;margin:0 0 8px;}
    .kfz .faq .q:before{content:"Q ";font-family:'Cormorant Garamond',serif;color:var(--clay);font-size:22px;}
    .kfz .faq .a{color:#5b5349;font-weight:300;padding-bottom:26px;margin-bottom:26px;border-bottom:1px solid var(--line);}
    .kfz .cta{text-align:center;padding:80px 0 120px;}
    .kfz .cta h2{font-size:clamp(24px,3.6vw,36px);font-weight:500;margin:0 0 16px;}
    .kfz .cta p{color:var(--muted);font-weight:300;max-width:520px;margin:0 auto 32px;}
    .kfz .btn{display:inline-block;background:var(--clay);color:#fff;text-decoration:none;border:none;cursor:pointer;padding:16px 44px;border-radius:999px;font-size:15px;letter-spacing:.05em;transition:transform .3s,background .3s;font-family:'Noto Sans TC';}
    .kfz .btn:hover{transform:translateY(-2px);background:#915f3e;}
    .kfz .works-head{padding:104px 0 24px;text-align:center;}
    .kfz .works-head h1{font-size:clamp(30px,5vw,48px);font-weight:500;margin:8px 0 12px;}
    .kfz .works-head p{color:var(--muted);font-weight:300;}
    .kfz .filter{display:flex;gap:18px;justify-content:center;padding:10px 0 44px;flex-wrap:wrap;}
    .kfz .filter button{font-family:'Noto Serif TC';font-size:21px;background:none;border:none;cursor:pointer;color:var(--muted);padding:10px 20px;border-radius:999px;transition:.2s;position:relative;letter-spacing:.04em;}
    .kfz .filter button.on{color:var(--ink);}
    .kfz .filter button.on:after{content:"";position:absolute;left:20px;right:20px;bottom:2px;height:2px;background:var(--clay);}
    .kfz .works-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px 28px;padding:4px 0 110px;}
    .kfz .card{cursor:pointer;position:relative;text-decoration:none;color:inherit;display:block;}
    .kfz .card .thumb{width:100%;aspect-ratio:16/10;overflow:hidden;background:#EFE7D9;display:flex;align-items:center;justify-content:center;border-radius:2px;position:relative;}
    .kfz .card .thumb img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1);}
    .kfz .card:hover .thumb img{transform:scale(1.045);}
    .kfz .card .thumb .ph{font-family:'Noto Serif TC',serif;color:var(--clay-soft);font-size:34px;}
    .kfz .card.todo .thumb{background:repeating-linear-gradient(45deg,#F1E9DB,#F1E9DB 14px,#EFE6D6 14px,#EFE6D6 28px);}
    .kfz .card .cap{text-align:center;padding:18px 10px 0;}
    .kfz .card .cap .en-name{font-family:'Cormorant Garamond',serif;color:var(--clay);letter-spacing:.16em;font-size:14px;}
    .kfz .card .cap h3{font-family:'Noto Serif TC',serif;font-size:22px;font-weight:500;margin:3px 0 0;letter-spacing:.05em;}
    .kfz .badge{position:absolute;top:0;left:0;margin:12px;z-index:2;background:var(--clay);color:#fff;font-size:11px;letter-spacing:.1em;padding:3px 10px;border-radius:999px;}
    .kfz .back{display:inline-flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;color:var(--clay);font-family:'Noto Sans TC';font-size:14px;padding:18px 0;text-decoration:none;}
    .kfz .case-hero{height:72vh;min-height:460px;background:var(--ink);display:flex;align-items:flex-end;position:relative;overflow:hidden;}
    .kfz .case-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
    .kfz .case-hero .ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff6;font-weight:300;letter-spacing:.12em;background:repeating-linear-gradient(45deg,#332f2a,#332f2a 14px,#2b2722 14px,#2b2722 28px);}
    .kfz .case-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55),rgba(0,0,0,0) 55%);}
    .kfz .case-hero .cap{position:relative;z-index:2;color:#fff;padding:0 28px 56px;max-width:980px;margin:0 auto;width:100%;}
    .kfz .case-hero .en-name{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.18em;opacity:.9;}
    .kfz .case-hero h1{font-family:'Noto Serif TC',serif;font-size:clamp(34px,6vw,64px);font-weight:500;margin:6px 0 14px;text-shadow:0 2px 20px rgba(0,0,0,.3);}
    .kfz .case-hero .tag{font-weight:300;font-size:18px;opacity:.95;}
    .kfz .meta{display:flex;flex-wrap:wrap;gap:10px;padding:36px 0;border-bottom:1px solid var(--line);}
    .kfz .meta span{font-size:13px;letter-spacing:.08em;color:var(--clay);border:1px solid var(--clay-soft);border-radius:999px;padding:5px 16px;}
    .kfz .meta .cat{background:var(--clay);color:#fff;border-color:var(--clay);}
    .kfz .sec{padding:54px 0;border-bottom:1px solid var(--line);}
    .kfz .sec .lab{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--clay);font-size:19px;letter-spacing:.06em;margin-bottom:14px;}
    .kfz .sec h2{font-size:26px;font-weight:500;margin:0 0 18px;}
    .kfz .sec p{color:#5b5349;font-weight:300;font-size:17px;}
    .kfz .hl{display:flex;gap:16px;align-items:flex-start;padding:12px 0;color:#5b5349;font-weight:300;}
    .kfz .hl b{color:var(--clay);font-family:'Cormorant Garamond',serif;font-size:20px;}
    .kfz .gallery .feat{width:100%;border-radius:4px;overflow:hidden;margin-bottom:16px;}
    .kfz .gallery .feat img{width:100%;height:auto;display:block;}
    .kfz .gallery .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;}
    .kfz .gallery figure{margin:0;}
    .kfz .gallery .feat .imgbox{position:relative;}
    .kfz .gallery .grid .imgbox{position:relative;aspect-ratio:4/3;border-radius:4px;overflow:hidden;}
    .kfz .gallery .grid .imgbox img{object-fit:cover;}
    .kfz .gallery figcaption{color:var(--muted);font-weight:300;font-size:14px;margin-top:8px;}
    .kfz .todo-txt{color:#b08968;font-style:italic;}
    .kfz .block-head{text-align:center;padding:70px 0 6px;}
    .kfz .block-head h2{font-size:clamp(24px,3.6vw,34px);font-weight:500;margin:6px 0 0;}
    .kfz .services{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:30px 0 8px;}
    .kfz .svc{background:var(--paper);border:1px solid var(--line);border-radius:6px;padding:32px 18px;text-align:center;transition:transform .3s,box-shadow .3s,border-color .3s;}
    .kfz .svc:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(43,39,34,.10);border-color:var(--clay-soft);}
    .kfz .svc svg{width:34px;height:34px;color:var(--clay);margin-bottom:12px;}
    .kfz .svc .name{font-family:'Noto Serif TC';font-size:17px;}
    .kfz .flow{position:relative;padding:34px 0 10px;}
    .kfz .flow:before{content:"";position:absolute;left:23px;top:54px;bottom:34px;width:1px;background:var(--line);}
    .kfz .fstep{position:relative;display:grid;grid-template-columns:48px 1fr;gap:22px;padding:14px 0;}
    .kfz .fdot{width:48px;height:48px;border-radius:50%;background:var(--cream);border:1px solid var(--clay-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond';font-size:22px;color:var(--clay);position:relative;z-index:1;}
    .kfz .fbody{padding-top:3px;}
    .kfz .fbody h3{font-size:20px;font-weight:500;margin:0;}
    .kfz .fbody .time{font-size:12px;color:var(--clay);letter-spacing:.08em;margin:2px 0 8px;}
    .kfz .fbody .desc{color:#5b5349;font-weight:300;font-size:15px;margin-bottom:8px;}
    .kfz .fbody .kv2{font-size:13.5px;color:var(--muted);font-weight:300;}
    .kfz .fbody .kv2 b{color:var(--clay);font-weight:500;}
    .kfz .stagebar{display:flex;align-items:center;gap:16px;margin:30px 0 8px;}
    .kfz .stagebar:before,.kfz .stagebar:after{content:"";flex:1;height:1px;background:var(--line);}
    .kfz .stagebar span{font-size:13px;letter-spacing:.2em;color:var(--clay);white-space:nowrap;}
    .kfz .values{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:30px 0 8px;}
    .kfz .val{display:flex;gap:14px;align-items:flex-start;background:var(--paper);border:1px solid var(--line);border-radius:6px;padding:22px;}
    .kfz .val svg{width:26px;height:26px;color:var(--clay);flex:0 0 auto;margin-top:2px;}
    .kfz .val .vt{font-family:'Noto Serif TC';font-size:16px;margin-bottom:3px;}
    .kfz .val .vd{color:var(--muted);font-weight:300;font-size:13.5px;}
    .kfz .topbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 28px;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);}
    .kfz .topbar .brand{font-family:'Noto Serif TC',serif;font-size:16px;letter-spacing:.06em;color:var(--ink);text-decoration:none;display:flex;align-items:center;gap:10px;}
    .kfz .topbar .brand .en{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--clay);letter-spacing:.18em;}
    .kfz .topbar nav{display:flex;align-items:center;gap:6px;}
    .kfz .topbar nav a{font-size:14px;color:var(--muted);text-decoration:none;padding:8px 14px;border-radius:999px;transition:.2s;}
    .kfz .topbar nav a:hover{color:var(--ink);}
    .kfz .topbar nav a.on{color:var(--ink);background:var(--paper);}
    .kfz .topbar nav a.home{color:var(--clay);border:1px solid var(--clay-soft);}
    .kfz .site-foot{background:#1A1510;color:rgba(255,255,255,.6);padding:2.5rem 28px;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;align-items:center;}
    .kfz .site-foot .serif{font-size:1.1rem;font-weight:300;letter-spacing:.15em;color:rgba(255,255,255,.45);}
    .kfz .site-foot p{font-size:.62rem;letter-spacing:.2em;color:rgba(255,255,255,.25);text-transform:uppercase;margin:0;}
    .kfz .site-foot a{font-size:.62rem;letter-spacing:.2em;color:rgba(255,255,255,.35);text-decoration:none;text-transform:uppercase;}
    @media(max-width:760px){ .kfz .services,.kfz .values{grid-template-columns:1fr 1fr;} }
    @media(max-width:480px){ .kfz .services,.kfz .values{grid-template-columns:1fr;} }
    @media(max-width:640px){ .kfz .step{grid-template-columns:60px 1fr;gap:16px;} .kfz .works-grid{grid-template-columns:1fr;} .kfz .topbar nav a:not(.home){display:none;} }
  `}</style>
  );
}
