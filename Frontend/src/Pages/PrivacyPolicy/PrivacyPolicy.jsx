import { Shield, Lock, Globe, Database, Cookie, Mail, UserCheck, FileText } from "lucide-react";
import Navbar from "../../Components/Layout/Navbar";
import Footer from "../../Components/Layout/Footer";

export default function PrivacyPolicy() {
  const lastUpdated = "September 8, 2025";

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-info", title: "How We Use Your Information" },
    { id: "cookies", title: "Cookies & Similar Technologies" },
    { id: "third-parties", title: "Third‑Party Services" },
    { id: "data-retention", title: "Data Retention" },
    { id: "security", title: "Security" },
    { id: "your-rights", title: "Your Rights & Choices" },
    { id: "children", title: "Children’s Privacy" },
    { id: "international", title: "International Data Transfers" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
        <Navbar/>
      {/* Header */}
      <header className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20 border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl md:text-2xl font-bold">Privacy Policy</h1>
          </div>
          <span className="text-sm text-slate-500">Last updated: {lastUpdated}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar / TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-2">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">On this page</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-600 hover:text-indigo-600 transition py-1">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="prose prose-slate max-w-none">
          {/* Intro */}
          <Section id="introduction" icon={<FileText className="w-5 h-5" />} title="Introduction">
            <p>
              Welcome to <strong>Careerly</strong>. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website and services (collectively, the “Services”). By using Careerly, you agree to the
              practices described in this policy.
            </p>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="m-0 text-sm"><strong>Quick summary:</strong> We only collect what we need to run Careerly (like your account info, quiz progress, and preferences), we never sell your data, and you stay in control.</p>
            </div>
          </Section>

          {/* What we collect */}
          <Section id="information-we-collect" icon={<Database className="w-5 h-5" />} title="Information We Collect">
            <ul>
              <li><strong>Account & Profile:</strong> name, email, avatar, authentication identifiers (via Clerk/Auth0/Firebase).</li>
              <li><strong>Usage Data:</strong> pages visited, feature interactions (e.g., resume builder, quizzes), device & browser info.</li>
              <li><strong>Content You Provide:</strong> resume data, quiz answers, messages submitted via contact forms.</li>
              <li><strong>Third‑Party Content:</strong> e.g., YouTube video metadata when you use our Learning Hub.</li>
            </ul>
          </Section>

          {/* How we use */}
          <Section id="how-we-use-info" icon={<Globe className="w-5 h-5" />} title="How We Use Your Information">
            <ul>
              <li>To operate and improve the Services (personalized dashboards, quizzes, and recommendations).</li>
              <li>To authenticate and secure accounts, prevent fraud/abuse, and keep Careerly reliable.</li>
              <li>To respond to support requests and communicate important updates.</li>
              <li>To analyze aggregated, non‑identifiable usage to improve performance and UX.</li>
            </ul>
          </Section>

          {/* Cookies */}
          <Section id="cookies" icon={<Cookie className="w-5 h-5" />} title="Cookies & Similar Technologies">
            <p>
              We use cookies and local storage to remember your settings, keep you signed in, and understand how the platform is used.
              You can control cookies via your browser settings. Disabling certain cookies may limit functionality.
            </p>
          </Section>

          {/* Third parties */}
          <Section id="third-parties" icon={<Globe className="w-5 h-5" />} title="Third‑Party Services">
            <p>Careerly integrates with trusted partners to deliver core features:</p>
            <ul>
              <li><strong>Authentication:</strong> Clerk / Auth0 / Firebase Auth for login and social sign‑in.</li>
              <li><strong>Video Content:</strong> YouTube Data API to surface learning resources (we fetch public video metadata only).</li>
              <li><strong>Analytics/Logging:</strong> privacy‑respecting analytics and error reporting to improve stability (provider may vary).</li>
            </ul>
            <p>
              These providers process data under their own privacy policies. We share only what’s necessary to operate Careerly and do not sell personal data.
            </p>
          </Section>

          {/* Retention */}
          <Section id="data-retention" icon={<Database className="w-5 h-5" />} title="Data Retention">
            <p>
              We retain personal information only for as long as needed to provide the Services, comply with legal obligations, resolve disputes,
              and enforce agreements. You can request deletion of your account and associated data at any time (see <a href="#your-rights">Your Rights</a>).
            </p>
          </Section>

          {/* Security */}
          <Section id="security" icon={<Lock className="w-5 h-5" />} title="Security">
            <p>
              We use industry‑standard safeguards to protect your information, including encryption in transit (HTTPS), access controls, and
              regular reviews. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          {/* Rights */}
          <Section id="your-rights" icon={<UserCheck className="w-5 h-5" />} title="Your Rights & Choices">
            <ul>
              <li><strong>Access & Update:</strong> view and edit your profile information.</li>
              <li><strong>Download:</strong> request a copy of your data in a portable format.</li>
              <li><strong>Delete:</strong> request account deletion; we will remove personal data unless retention is legally required.</li>
              <li><strong>Opt‑Out:</strong> control cookies and certain communications.</li>
            </ul>
          </Section>

          {/* Children */}
          <Section id="children" icon={<Shield className="w-5 h-5" />} title="Children’s Privacy">
            <p>
              Careerly is not directed to children under 13 (or the minimum age required in your jurisdiction). We do not knowingly collect personal
              information from children. If you believe a child has provided us with personal data, please contact us and we will take appropriate action.
            </p>
          </Section>

          {/* International */}
          <Section id="international" icon={<Globe className="w-5 h-5" />} title="International Data Transfers">
            <p>
              Your information may be processed in countries other than your own. Where required, we implement appropriate safeguards to protect your data in
              accordance with applicable laws.
            </p>
          </Section>

          {/* Changes */}
          <Section id="changes" icon={<FileText className="w-5 h-5" />} title="Changes to This Policy">
            <p>
              We may update this Privacy Policy to reflect operational, legal, or regulatory changes. If we make material updates, we will notify you by
              posting the new policy and updating the "Last updated" date above.
            </p>
          </Section>

          {/* Contact */}
          <Section id="contact" icon={<Mail className="w-5 h-5" />} title="Contact Us">
            <p>
              Have questions or requests? Reach us at <a href="mailto:support@careerly.app">support@careerly.app</a>.
              You can also contact us through the in‑app Help/Support section.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border">
              <p className="m-0 text-sm"><strong>Controller:</strong> Careerly Team</p>
              <p className="m-0 text-sm"><strong>Address:</strong> (30 Career Street, Sucess City.)</p>
            </div>
          </Section>
        </article>
      </main>
      <Footer/>
    </div>
  );
}

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-2 text-slate-900">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700">
          {icon}
        </span>
        <h2 className="m-0 text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
        {children}
      </div>
      <hr className="my-8 border-slate-200" />
    </section>
  );
}
