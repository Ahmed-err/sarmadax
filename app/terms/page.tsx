import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/shared/CustomCursor";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing Sarmadax's services and client engagements.",
};

const CONTACT_EMAIL = "hello@sarmadax.com";

const content = {
  en: {
    badge: "Legal",
    title: "Terms of Service",
    lastUpdated: "Last updated: April 17, 2026",
    sections: [
      {
        title: "1. Overview",
        body: (
          <>
            <p>
              These Terms of Service ("Terms") govern the relationship between Sarmadax ("we",
              "us", "our") and any individual or entity ("Client", "you") that engages Sarmadax
              for digital services — including web development, mobile app development, UI/UX
              design, AI integration, and related work.
            </p>
            <p>
              By submitting a project inquiry, signing a proposal, or making any payment to
              Sarmadax, you agree to these Terms. If you do not agree, do not engage our services.
            </p>
          </>
        ),
      },
      {
        title: "2. Services",
        body: (
          <>
            <p>
              Sarmadax provides custom digital product development services as described in the
              project proposal issued for each engagement. The exact scope, deliverables, timeline,
              and price are defined in the proposal document, which forms part of the agreement
              between us.
            </p>
            <p>
              We reserve the right to decline any project inquiry at our discretion, including
              projects that conflict with our values or are technically outside our scope.
            </p>
          </>
        ),
      },
      {
        title: "3. Quotes & Pricing",
        body: (
          <>
            <p>
              All quotes are fixed-price unless explicitly stated otherwise in the proposal.
              The price in the signed proposal is final — we do not issue additional invoices
              for work within the agreed scope.
            </p>
            <p>
              Any work outside the agreed scope (scope changes, additional features, or requests
              beyond what the proposal describes) will be quoted and agreed upon in writing before
              that work begins. No out-of-scope work will be billed without your explicit approval.
            </p>
          </>
        ),
      },
      {
        title: "4. Payment Terms",
        body: (
          <>
            <p>Payments are structured as follows unless the proposal states otherwise:</p>
            <ul>
              <li>
                <strong>50% upfront</strong> — due before work begins. This covers discovery,
                design, and early development.
              </li>
              <li>
                <strong>50% on completion</strong> — due only after you have reviewed and
                approved the final deliverables.
              </li>
            </ul>
            <p>
              The first payment confirms the project start date. Work will not begin until the
              initial payment is received. The final payment is due within 7 days of your written
              approval of the completed work.
            </p>
            <p>
              Late payments (beyond 14 days overdue) may result in suspension of delivery, source
              code access, or support until the balance is settled.
            </p>
          </>
        ),
      },
      {
        title: "5. Intellectual Property & Ownership",
        body: (
          <>
            <p>
              Upon receipt of the final payment, all intellectual property rights in the
              deliverables — including source code, design files, and any custom assets created
              for your project — transfer fully to you, the Client. You own everything outright,
              with no ongoing license fees or restrictions.
            </p>
            <p>
              Prior to final payment, all work remains the property of Sarmadax. Partial delivery
              does not imply partial ownership transfer.
            </p>
            <p>
              <strong>Third-party components:</strong> Deliverables may incorporate open-source
              libraries, fonts, or stock assets. Ownership of those components remains governed by
              their respective licenses, which we will document in the project handover.
            </p>
            <p>
              <strong>Portfolio rights:</strong> Unless you request otherwise in writing, we
              reserve the right to display the completed project in our portfolio and case studies,
              including screenshots, a project description, and a link to the live product.
            </p>
          </>
        ),
      },
      {
        title: "6. Revisions",
        body: (
          <>
            <p>
              The number of included revision rounds is stated in the proposal (typically 2–3
              rounds for design, unlimited for bug fixes within the agreed scope).
            </p>
            <p>
              A "revision" means adjustments to existing deliverables based on feedback. New
              features or significant design changes requested after a revision round has started
              are treated as scope changes and quoted separately.
            </p>
            <p>
              We will continue working until you are genuinely satisfied with the deliverables as
              scoped. We do not consider a project complete until you have given written approval.
            </p>
          </>
        ),
      },
      {
        title: "7. Timeline & Delivery",
        body: (
          <>
            <p>
              Estimated timelines are stated in the proposal. We commit to honoring these
              timelines. If a delay is caused on our side, no additional charges will apply for
              the extra time taken.
            </p>
            <p>
              Timelines assume timely feedback from the Client. If feedback or approvals are
              delayed by more than 5 business days without notice, we reserve the right to adjust
              the delivery date accordingly.
            </p>
          </>
        ),
      },
      {
        title: "8. Confidentiality",
        body: (
          <>
            <p>
              Both parties agree to keep confidential any non-public information shared during the
              project — including business logic, unreleased product details, pricing, and client
              data — and not to disclose it to third parties without written consent.
            </p>
            <p>
              If a separate Non-Disclosure Agreement (NDA) is required, we are happy to sign one
              before the discovery call.
            </p>
          </>
        ),
      },
      {
        title: "9. Client Responsibilities",
        body: (
          <>
            <p>
              You agree to provide timely feedback, accurate requirements, and any assets,
              credentials, or access needed for the project. Delays caused by incomplete or late
              input from your side may affect timelines and are not our responsibility.
            </p>
            <p>
              You confirm that any content, branding, or materials you provide to us do not
              infringe on any third-party intellectual property rights. You are responsible for
              obtaining any necessary licenses for third-party content included in the project.
            </p>
          </>
        ),
      },
      {
        title: "10. Limitation of Liability",
        body: (
          <>
            <p>
              To the maximum extent permitted by applicable law, Sarmadax&apos;s total liability
              for any claim arising from our services is limited to the total amount paid by you
              for the specific project giving rise to the claim.
            </p>
            <p>
              We are not liable for indirect, incidental, consequential, or punitive damages —
              including loss of revenue, loss of data, or business interruption — even if we have
              been advised of the possibility of such damages.
            </p>
          </>
        ),
      },
      {
        title: "11. Warranties",
        body: (
          <>
            <p>
              We warrant that deliverables will function materially as described in the proposal
              and be free from defects for 30 days after final delivery (or as otherwise stated in
              the proposal). We will fix defects within this period at no additional cost.
            </p>
            <p>
              Beyond this warranty period, ongoing support and maintenance are provided under a
              separate agreement or billed at an agreed hourly rate.
            </p>
            <p>
              We do not warrant uninterrupted operation of third-party services, hosting platforms,
              or external APIs integrated into your product.
            </p>
          </>
        ),
      },
      {
        title: "12. Termination",
        body: (
          <>
            <p>
              Either party may terminate the engagement with written notice. In the event of
              termination:
            </p>
            <ul>
              <li>
                You owe payment for all work completed up to the termination date, prorated from
                the 50% deposit.
              </li>
              <li>
                If the deposit exceeds the value of work completed, we will refund the difference.
              </li>
              <li>
                Ownership of partial deliverables transfers only upon receipt of payment for those
                deliverables.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "13. Governing Law",
        body: (
          <p>
            These Terms are governed by applicable law. Any disputes shall be resolved through
            good-faith negotiation first. If negotiation fails, disputes will be submitted to
            binding arbitration or the courts of the jurisdiction mutually agreed upon in the
            project proposal.
          </p>
        ),
      },
      {
        title: "14. Changes to These Terms",
        body: (
          <p>
            We may update these Terms from time to time. Changes apply to new engagements entered
            after the updated date. Ongoing projects are governed by the Terms in effect at the
            time the proposal was signed.
          </p>
        ),
      },
      {
        title: "15. Contact",
        body: (
          <p>
            Questions about these Terms?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ),
      },
    ],
  },
  ar: {
    badge: "قانوني",
    title: "شروط الخدمة",
    lastUpdated: "آخر تحديث: 17 أبريل 2026",
    sections: [
      {
        title: "1. نظرة عامة",
        body: (
          <>
            <p>
              تحكم شروط الخدمة هذه ("الشروط") العلاقة بين Sarmadax ("نحن"، "لنا"، "خاصتنا")
              وأي فرد أو جهة ("العميل"، "أنت") تتعامل مع Sarmadax للحصول على خدمات رقمية —
              بما فيها تطوير الويب، تطوير التطبيقات، تصميم UI/UX، تكامل الذكاء الاصطناعي،
              والأعمال ذات الصلة.
            </p>
            <p>
              بتقديم استفسار مشروع أو توقيع عرض أو إجراء أي دفعة لـ Sarmadax، فإنك توافق
              على هذه الشروط. إن لم توافق، لا تتعامل مع خدماتنا.
            </p>
          </>
        ),
      },
      {
        title: "2. الخدمات",
        body: (
          <>
            <p>
              تقدم Sarmadax خدمات تطوير منتجات رقمية مخصصة كما هو موضح في عرض المشروع
              الصادر لكل تعاقد. يُحدَّد النطاق الدقيق والمخرجات والجدول الزمني والسعر في
              وثيقة العرض التي تشكل جزءاً من الاتفاقية بيننا.
            </p>
            <p>
              نحتفظ بالحق في رفض أي استفسار مشروع وفق تقديرنا، بما في ذلك المشاريع التي
              تتعارض مع قيمنا أو تقع خارج نطاق تخصصنا.
            </p>
          </>
        ),
      },
      {
        title: "3. عروض الأسعار والتسعير",
        body: (
          <>
            <p>
              جميع عروض الأسعار بسعر ثابت ما لم يُنص صراحةً على خلاف ذلك في العرض. السعر
              في العرض الموقَّع نهائي — لا نُصدر فواتير إضافية للعمل ضمن النطاق المتفق عليه.
            </p>
            <p>
              أي عمل خارج النطاق المتفق عليه (تغييرات النطاق، أو ميزات إضافية، أو طلبات
              تتجاوز ما يصفه العرض) سيُقتبس ويُتفق عليه كتابياً قبل البدء به. لن يُفوتر أي
              عمل خارج النطاق دون موافقتك الصريحة.
            </p>
          </>
        ),
      },
      {
        title: "4. شروط الدفع",
        body: (
          <>
            <p>تُهيكل المدفوعات على النحو التالي ما لم يذكر العرض خلاف ذلك:</p>
            <ul>
              <li>
                <strong>50% مقدماً</strong> — مستحق قبل بدء العمل. يغطي هذا مرحلة الاستكشاف
                والتصميم والتطوير المبكر.
              </li>
              <li>
                <strong>50% عند الإنجاز</strong> — مستحق فقط بعد مراجعتك وموافقتك على
                المخرجات النهائية.
              </li>
            </ul>
            <p>
              تؤكد الدفعة الأولى تاريخ بدء المشروع. لن يبدأ العمل حتى استلام الدفعة الأولى.
              الدفعة النهائية مستحقة خلال 7 أيام من موافقتك الكتابية على العمل المنجز.
            </p>
            <p>
              قد تؤدي المدفوعات المتأخرة (بعد 14 يوماً من الاستحقاق) إلى تعليق التسليم أو
              الوصول للكود المصدري أو الدعم حتى تسوية الرصيد.
            </p>
          </>
        ),
      },
      {
        title: "5. الملكية الفكرية والحقوق",
        body: (
          <>
            <p>
              عند استلام الدفعة النهائية، تنتقل إليك كاملاً جميع حقوق الملكية الفكرية في
              المخرجات — بما فيها الكود المصدري وملفات التصميم وأي أصول مخصصة أُنشئت
              لمشروعك. تمتلك كل شيء بالكامل دون رسوم ترخيص مستمرة أو قيود.
            </p>
            <p>
              قبل الدفعة النهائية، يظل جميع العمل ملكاً لـ Sarmadax. التسليم الجزئي لا يعني
              انتقالاً جزئياً للملكية.
            </p>
            <p>
              <strong>مكونات الطرف الثالث:</strong> قد تتضمن المخرجات مكتبات مفتوحة المصدر
              أو خطوطاً أو أصول مخزون. تظل ملكية هذه المكونات خاضعة لتراخيصها المعنية التي
              سنوثقها في تسليم المشروع.
            </p>
            <p>
              <strong>حقوق المحفظة:</strong> ما لم تطلب خلاف ذلك كتابياً، نحتفظ بالحق في
              عرض المشروع المكتمل في محفظتنا ودراسات الحالة، بما في ذلك لقطات الشاشة ووصف
              المشروع ورابط المنتج المباشر.
            </p>
          </>
        ),
      },
      {
        title: "6. المراجعات",
        body: (
          <>
            <p>
              يُذكر عدد جولات المراجعة المضمّنة في العرض (عادةً 2–3 جولات للتصميم، وغير
              محدود لإصلاح الأخطاء ضمن النطاق المتفق عليه).
            </p>
            <p>
              تعني "المراجعة" تعديلات على المخرجات القائمة بناءً على الملاحظات. تُعامَل
              الميزات الجديدة أو التغييرات الجوهرية في التصميم المطلوبة بعد بدء جولة
              المراجعة على أنها تغييرات في النطاق وتُقتبس بشكل منفصل.
            </p>
            <p>
              سنواصل العمل حتى تكون راضياً فعلاً عن المخرجات كما هي مُحددة. لا نعتبر
              المشروع مكتملاً حتى تُعطي موافقتك الكتابية.
            </p>
          </>
        ),
      },
      {
        title: "7. الجدول الزمني والتسليم",
        body: (
          <>
            <p>
              تُذكر الجداول الزمنية التقديرية في العرض. نلتزم بالوفاء بهذه الجداول. إن
              كان التأخير ناتجاً عن جانبنا، فلن تُطبَّق أي رسوم إضافية على الوقت الإضافي
              المُستغرق.
            </p>
            <p>
              تفترض الجداول الزمنية تقديم ملاحظات في الوقت المناسب من قِبل العميل. إن
              تأخرت الملاحظات أو الموافقات أكثر من 5 أيام عمل دون إشعار، نحتفظ بالحق في
              تعديل تاريخ التسليم وفقاً لذلك.
            </p>
          </>
        ),
      },
      {
        title: "8. السرية",
        body: (
          <>
            <p>
              يوافق الطرفان على الحفاظ على سرية أي معلومات غير عامة تُشارَك خلال المشروع —
              بما في ذلك منطق الأعمال وتفاصيل المنتج غير المُصدر والتسعير وبيانات العملاء —
              وعدم الإفصاح عنها لأطراف ثالثة دون موافقة كتابية.
            </p>
            <p>
              إن كانت هناك حاجة لاتفاقية عدم إفصاح (NDA) منفصلة، يسعدنا توقيعها قبل مكالمة
              الاستكشاف.
            </p>
          </>
        ),
      },
      {
        title: "9. مسؤوليات العميل",
        body: (
          <>
            <p>
              توافق على تقديم ملاحظات في الوقت المناسب، ومتطلبات دقيقة، وأي أصول أو بيانات
              اعتماد أو وصول مطلوب للمشروع. التأخيرات الناجمة عن مدخلات ناقصة أو متأخرة من
              جانبك قد تؤثر على الجداول الزمنية وليست مسؤوليتنا.
            </p>
            <p>
              تؤكد أن أي محتوى أو علامة تجارية أو مواد تقدمها لنا لا تنتهك أي حقوق ملكية
              فكرية لطرف ثالث. أنت مسؤول عن الحصول على التراخيص اللازمة لأي محتوى طرف ثالث
              مدرج في المشروع.
            </p>
          </>
        ),
      },
      {
        title: "10. تحديد المسؤولية",
        body: (
          <>
            <p>
              بالحد الأقصى المسموح به بموجب القانون المعمول به، تُحدَّد مسؤولية Sarmadax
              الإجمالية عن أي مطالبة ناشئة عن خدماتنا بالمبلغ الإجمالي الذي دفعته مقابل
              المشروع المحدد الذي أدى إلى المطالبة.
            </p>
            <p>
              لسنا مسؤولين عن الأضرار غير المباشرة أو العرضية أو التبعية أو العقابية —
              بما في ذلك خسارة الإيرادات أو البيانات أو انقطاع الأعمال — حتى لو أُبلغنا
              باحتمال وقوع مثل هذه الأضرار.
            </p>
          </>
        ),
      },
      {
        title: "11. الضمانات",
        body: (
          <>
            <p>
              نضمن أن المخرجات ستعمل بشكل جوهري كما هو موضح في العرض وتكون خالية من العيوب
              لمدة 30 يوماً بعد التسليم النهائي (أو كما هو مذكور في العرض). سنُصلح العيوب
              خلال هذه المدة دون تكلفة إضافية.
            </p>
            <p>
              بعد فترة الضمان هذه، يُقدَّم الدعم والصيانة المستمرة بموجب اتفاقية منفصلة أو
              تُفوتر بسعر ساعي متفق عليه.
            </p>
            <p>
              لا نضمن التشغيل المتواصل لخدمات الطرف الثالث أو منصات الاستضافة أو واجهات API
              الخارجية المدمجة في منتجك.
            </p>
          </>
        ),
      },
      {
        title: "12. الإنهاء",
        body: (
          <>
            <p>يحق لأي من الطرفين إنهاء التعاقد بإشعار كتابي. في حال الإنهاء:</p>
            <ul>
              <li>
                يتوجب عليك سداد مبالغ جميع الأعمال المنجزة حتى تاريخ الإنهاء، محسوبةً
                بالتناسب من الدفعة الأولى بنسبة 50%.
              </li>
              <li>
                إن تجاوزت الدفعة المقدمة قيمة الأعمال المنجزة، سنُعيد الفرق.
              </li>
              <li>
                تنتقل ملكية المخرجات الجزئية فقط عند استلام الدفعة المقابلة لتلك المخرجات.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "13. القانون الحاكم",
        body: (
          <p>
            تخضع هذه الشروط للقانون المعمول به. تُحسم أي نزاعات أولاً من خلال التفاوض
            بحسن نية. إن فشل التفاوض، تُحال النزاعات إلى التحكيم الملزم أو محاكم الولاية
            القضائية المتفق عليها في عرض المشروع.
          </p>
        ),
      },
      {
        title: "14. التغييرات على هذه الشروط",
        body: (
          <p>
            قد نحدّث هذه الشروط من وقت لآخر. تسري التغييرات على التعاقدات الجديدة المُبرمة
            بعد تاريخ التحديث. تخضع المشاريع الجارية للشروط السارية وقت توقيع العرض.
          </p>
        ),
      },
      {
        title: "15. التواصل",
        body: (
          <p>
            هل لديك أسئلة حول هذه الشروط؟{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ),
      },
    ],
  },
};

export default async function TermsPage() {
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
