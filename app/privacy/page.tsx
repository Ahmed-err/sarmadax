import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sarmadax collects, uses, and protects your information.",
};

const CONTACT_EMAIL = "hello@sarmadax.com";

const content = {
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 17, 2026",
    sections: [
      {
        title: "1. Overview",
        body: (
          <>
            <p>
              Sarmadax ("we", "us", "our") is a boutique digital agency operated by Ahmed. This
              Privacy Policy explains what information we collect when you visit{" "}
              <strong>sarmadax.com</strong>, how we use it, and your rights regarding that
              information.
            </p>
            <p>
              We collect the minimum data necessary to respond to project inquiries and operate
              the website. We do not sell, rent, or trade your personal information.
            </p>
          </>
        ),
      },
      {
        title: "2. Information We Collect",
        body: (
          <>
            <h3>Contact form submissions</h3>
            <p>
              When you fill out the contact form we collect: your name, email address, project
              type, budget range, and the message you provide. This information is submitted
              voluntarily and is used solely to respond to your inquiry.
            </p>
            <h3>Automatically collected data</h3>
            <p>
              Like most websites, our hosting and infrastructure providers may automatically
              collect standard server log data such as your IP address, browser type, referring
              URL, and pages visited. This data is used for security and performance monitoring
              and is not linked to your personal identity.
            </p>
          </>
        ),
      },
      {
        title: "3. How We Use Your Information",
        body: (
          <>
            <ul>
              <li>To respond to your project inquiry or question</li>
              <li>To send you a project proposal if requested</li>
              <li>To communicate throughout an active project engagement</li>
              <li>To improve the website based on aggregate usage patterns</li>
            </ul>
            <p>
              We do not use your information for marketing to third parties, profiling, or
              automated decision-making.
            </p>
          </>
        ),
      },
      {
        title: "4. Third-Party Services",
        body: (
          <>
            <h3>Resend (email delivery)</h3>
            <p>
              Contact form submissions are delivered to us via{" "}
              <strong>Resend</strong> (resend.com), an email infrastructure service. Your
              submitted data passes through Resend's servers to be delivered as an email. Resend
              processes this data as a data processor on our behalf. See{" "}
              <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer">
                Resend&apos;s Privacy Policy
              </a>{" "}
              for details.
            </p>
            <h3>Hosting &amp; infrastructure</h3>
            <p>
              The website is hosted on Vercel. Vercel may collect standard infrastructure
              telemetry. See{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                Vercel&apos;s Privacy Policy
              </a>
              .
            </p>
          </>
        ),
      },
      {
        title: "5. Cookies & Local Storage",
        body: (
          <>
            <p>We use a minimal number of browser storage mechanisms:</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>NEXT_LOCALE</code></td>
                  <td>Cookie</td>
                  <td>Stores your language preference (English or Arabic)</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td>localStorage</td>
                  <td>Stores your dark/light mode preference</td>
                  <td>Persistent</td>
                </tr>
              </tbody>
            </table>
            <p>We do not use advertising cookies, tracking pixels, or third-party analytics cookies.</p>
          </>
        ),
      },
      {
        title: "6. Data Retention",
        body: (
          <>
            <p>
              Inquiry emails are retained in our inbox for as long as is necessary to manage the
              project relationship — typically up to 2 years after the last communication. You may
              request earlier deletion at any time (see Section 7).
            </p>
            <p>
              Server log data is retained by hosting providers according to their own policies,
              typically 30–90 days.
            </p>
          </>
        ),
      },
      {
        title: "7. Your Rights",
        body: (
          <>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of any personal data we hold about you</li>
              <li><strong>Correction</strong> — ask us to correct inaccurate information</li>
              <li><strong>Deletion</strong> — ask us to delete your personal data</li>
              <li><strong>Objection</strong> — object to our processing of your data</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.
            </p>
          </>
        ),
      },
      {
        title: "8. Children's Privacy",
        body: (
          <p>
            This website is not directed at children under 13. We do not knowingly collect
            personal information from anyone under 13. If you believe a child has submitted
            information to us, please contact us and we will delete it promptly.
          </p>
        ),
      },
      {
        title: "9. Changes to This Policy",
        body: (
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            "Last updated" date at the top of this page. Continued use of the website after
            changes constitutes acceptance of the revised policy.
          </p>
        ),
      },
      {
        title: "10. Contact",
        body: (
          <p>
            Questions about this policy? Reach us at:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ),
      },
    ],
  },
  ar: {
    badge: "قانوني",
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: 17 أبريل 2026",
    sections: [
      {
        title: "1. نظرة عامة",
        body: (
          <>
            <p>
              Sarmadax ("نحن"، "لنا"، "خاصتنا") هي وكالة رقمية متخصصة يديرها أحمد. توضح سياسة
              الخصوصية هذه المعلومات التي نجمعها عند زيارتك لـ <strong>sarmadax.com</strong>،
              وكيفية استخدامها، وحقوقك المتعلقة بها.
            </p>
            <p>
              نجمع الحد الأدنى من البيانات اللازمة للرد على استفسارات المشاريع وتشغيل الموقع.
              لا نبيع معلوماتك الشخصية أو نؤجرها أو نتاجر بها.
            </p>
          </>
        ),
      },
      {
        title: "2. المعلومات التي نجمعها",
        body: (
          <>
            <h3>استمارة التواصل</h3>
            <p>
              عند تعبئة استمارة التواصل، نجمع: اسمك، عنوان بريدك الإلكتروني، نوع المشروع،
              الميزانية التقريبية، والرسالة التي تقدمها. تُقدَّم هذه المعلومات طوعاً وتُستخدم
              حصراً للرد على استفسارك.
            </p>
            <h3>البيانات المجمعة تلقائياً</h3>
            <p>
              كسائر المواقع الإلكترونية، قد تجمع خدمات الاستضافة والبنية التحتية لدينا
              تلقائياً بيانات سجل خادم قياسية كعنوان IP ونوع المتصفح وعنوان URL المُحيل
              والصفحات المُزارة. تُستخدم هذه البيانات لأغراض الأمان ومراقبة الأداء ولا ترتبط
              بهويتك الشخصية.
            </p>
          </>
        ),
      },
      {
        title: "3. كيف نستخدم معلوماتك",
        body: (
          <>
            <ul>
              <li>للرد على استفسارك أو سؤالك المتعلق بالمشروع</li>
              <li>لإرسال عرض مشروع إليك عند الطلب</li>
              <li>للتواصل طوال مراحل المشروع النشط</li>
              <li>لتحسين الموقع استناداً إلى أنماط الاستخدام الإجمالية</li>
            </ul>
            <p>
              لا نستخدم معلوماتك للتسويق لأطراف ثالثة أو لأغراض التنميط أو اتخاذ القرار
              الآلي.
            </p>
          </>
        ),
      },
      {
        title: "4. خدمات الطرف الثالث",
        body: (
          <>
            <h3>Resend (تسليم البريد الإلكتروني)</h3>
            <p>
              تُسلَّم إلينا إرسالات استمارة التواصل عبر{" "}
              <strong>Resend</strong> (resend.com)، وهي خدمة بنية تحتية للبريد الإلكتروني.
              تمر بياناتك المُرسلة عبر خوادم Resend لتُسلَّم كبريد إلكتروني. تعالج Resend
              هذه البيانات بوصفها معالجاً للبيانات نيابةً عنا. اطلع على{" "}
              <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer">
                سياسة خصوصية Resend
              </a>{" "}
              للتفاصيل.
            </p>
            <h3>الاستضافة والبنية التحتية</h3>
            <p>
              يُستضاف الموقع على Vercel التي قد تجمع قياسات بنية تحتية قياسية. اطلع على{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                سياسة خصوصية Vercel
              </a>
              .
            </p>
          </>
        ),
      },
      {
        title: "5. ملفات تعريف الارتباط والتخزين المحلي",
        body: (
          <>
            <p>نستخدم حداً أدنى من آليات تخزين المتصفح:</p>
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>النوع</th>
                  <th>الغرض</th>
                  <th>المدة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>NEXT_LOCALE</code></td>
                  <td>ملف تعريف ارتباط</td>
                  <td>يحفظ تفضيل اللغة (العربية أو الإنجليزية)</td>
                  <td>سنة واحدة</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td>localStorage</td>
                  <td>يحفظ تفضيل الوضع الداكن أو الفاتح</td>
                  <td>دائم</td>
                </tr>
              </tbody>
            </table>
            <p>لا نستخدم ملفات تعريف ارتباط إعلانية أو بكسلات تتبع أو ملفات تعريف ارتباط تحليلية من طرف ثالث.</p>
          </>
        ),
      },
      {
        title: "6. الاحتفاظ بالبيانات",
        body: (
          <>
            <p>
              تُحتفظ برسائل البريد الإلكتروني للاستفسارات في صندوق الوارد لدينا طالما كان
              ذلك ضرورياً لإدارة علاقة المشروع — عادةً حتى عامين بعد آخر تواصل. يمكنك طلب
              الحذف المبكر في أي وقت (انظر القسم 7).
            </p>
            <p>
              تُحتفظ ببيانات سجل الخادم من قِبل مزودي الاستضافة وفقاً لسياساتهم الخاصة،
              وعادةً من 30 إلى 90 يوماً.
            </p>
          </>
        ),
      },
      {
        title: "7. حقوقك",
        body: (
          <>
            <p>يحق لك:</p>
            <ul>
              <li><strong>الوصول</strong> — طلب نسخة من أي بيانات شخصية نحتفظ بها عنك</li>
              <li><strong>التصحيح</strong> — مطالبتنا بتصحيح معلومات غير دقيقة</li>
              <li><strong>الحذف</strong> — مطالبتنا بحذف بياناتك الشخصية</li>
              <li><strong>الاعتراض</strong> — الاعتراض على معالجتنا لبياناتك</li>
            </ul>
            <p>
              لممارسة أي من هذه الحقوق، راسلنا على{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. سنرد خلال 30 يوماً.
            </p>
          </>
        ),
      },
      {
        title: "8. خصوصية الأطفال",
        body: (
          <p>
            هذا الموقع غير موجه للأطفال دون سن 13. لا نجمع عن قصد معلومات شخصية من أي
            شخص دون 13 عاماً. إن كنت تعتقد أن طفلاً قدّم معلومات إلينا، تواصل معنا
            وسنحذفها فوراً.
          </p>
        ),
      },
      {
        title: "9. التغييرات على هذه السياسة",
        body: (
          <p>
            قد نحدّث سياسة الخصوصية هذه من وقت لآخر. عند التحديث، سنغيّر تاريخ "آخر
            تحديث" في أعلى هذه الصفحة. يُعدّ استمرار استخدام الموقع بعد التغييرات قبولاً
            للسياسة المحدّثة.
          </p>
        ),
      },
      {
        title: "10. التواصل",
        body: (
          <p>
            هل لديك أسئلة حول هذه السياسة؟ تواصل معنا على:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ),
      },
    ],
  },
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  const c = locale === "ar" ? content.ar : content.en;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main id="main" className="min-h-screen pb-24 pt-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              {c.badge}
            </p>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
              {c.title}
            </h1>
            <p className="text-sm text-text-muted">{c.lastUpdated}</p>
          </div>

          <div className="prose-legal">
            {c.sections.map((section) => (
              <section key={section.title} className="mb-10">
                <h2 className="mb-4 text-xl font-bold text-foreground">{section.title}</h2>
                <div className="flex flex-col gap-3 text-sm leading-relaxed text-text-secondary">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
