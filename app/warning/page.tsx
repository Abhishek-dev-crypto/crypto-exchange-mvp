'use client';

export default function WarningPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8 scroll-smooth" id="top">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-700">
            Beware of Scams: Protect Yourself from Fraudsters Impersonating AllChain
          </h1>
          <p className="text-xl mb-2">
            Shield yourself from impostors posing as AllChain to safeguard against fraud.
          </p>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-semibold mb-2">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <a href="#how-the-scam-works" className="text-blue-600 hover:underline">
                How the Scam Works
              </a>
            </li>
            <li>
              <a href="#key-takeaways" className="text-blue-600 hover:underline">
                Key Takeaways
              </a>
            </li>
            <li>
              <a href="#how-to-stay-safe" className="text-blue-600 hover:underline">
                How to Stay Safe
              </a>
            </li>
            <li>
              <a href="#genuine-app" className="text-blue-600 hover:underline">
                If Interacted on Genuine AllChain App
              </a>
            </li>
            <li>
              <a href="#fake-platforms" className="text-blue-600 hover:underline">
                If Interacted on Fake/Unofficial Platforms
              </a>
            </li>
            <li>
              <a href="#legal-measures" className="text-blue-600 hover:underline">
                Legal Measures Against Misuse
              </a>
            </li>
            <li>
              <a href="#conclusion" className="text-blue-600 hover:underline">
                Conclusion
              </a>
            </li>
          </ol>
        </nav>

        {/* How the Scam Works */}
        <section id="how-the-scam-works" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How the Scam Works</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Initial Contact</h3>
              <p>
                Scammers reach out to users via social media platforms such as Telegram and WhatsApp,
                impersonating AllChain representatives. These initial contacts often appear trustworthy by
                using familiar logos and language to gain your confidence.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Request for Reviews</h3>
              <p>
                They ask users to submit Google reviews or ratings for services. For example, scammers might ask
                you to review a hotel or a crypto investment opportunity that doesn’t exist. This tactic builds rapport
                before moving on to more deceptive practices.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Fake Investment Links</h3>
              <p>
                After the review, scammers provide a link to a fake AllChain website and urge you to invest money.
                This fake site isn’t affiliated with AllChain and can be mistaken for the real site if you’re not careful.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Incremental Payment Requests</h3>
              <p>
                Scammers begin with small payment requests and gradually increase their demands by using different UPI IDs,
                URLs, and bank details. This approach keeps victims engaged while gradually draining their funds.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Refusal to Withdraw</h3>
              <p>
                When users try to withdraw funds, scammers provide excuses and refuse to return the money, citing errors or
                transaction issues. This leaves users frustrated and unable to recover their funds.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Real-Life Example</h3>
              <p>
                One user’s experience involved being repeatedly asked for additional funds to withdraw their initial investment.
                Scammers employed fake notices and agreements on AllChain letterhead to pressure the user into complying with
                their demands.
              </p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section id="key-takeaways" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              <strong>AllChain Will Never Ask for Money:</strong> AllChain will never contact you via social media to ask for money,
              investment, or personal details. Any such request is a clear scam.
            </li>
            <li>
              <strong>Official Communication Channels:</strong> All official communications from AllChain come through our verified channels.
              Always verify information by visiting our official website at{" "}
              <a
                href="https://allchain.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                allchain.com
              </a>.
            </li>
            <li>
              <strong>Report Suspicious Activity:</strong> If you receive unsolicited messages claiming to be from AllChain,
              do not respond. Report and block such contacts immediately. Contact us at{" "}
              <a href="mailto:spam.reporting@allchain.com" className="text-blue-600 underline">
                spam.reporting@allchain.com
              </a>.
            </li>
          </ul>
        </section>

        {/* How to Stay Safe */}
        <section id="how-to-stay-safe" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How to Stay Safe</h2>
          <div className="space-y-8 text-lg">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Verify the Source</h3>
              <p>
                Always check if communications are from an official AllChain channel. Look for verified badges on social media.
                If something seems off, it likely is.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Do Not Share Personal Information</h3>
              <p>
                Never share personal or financial details with anyone claiming to be from AllChain on social media.
                Our representatives will never ask for sensitive information through these channels.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Report Scams</h3>
              <p>
                If you encounter suspicious activity, report it to AllChain support immediately via our app or website.
                Prompt reporting helps protect other users.
              </p>
            </div>
          </div>
        </section>

        {/* If Interacted on Genuine AllChain App */}
        <section id="genuine-app" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">If Interacted on Genuine AllChain App</h2>
          <p className="text-lg">
            If you have used our genuine AllChain app (available on the App Store or Play Store), first open the app and raise a query.
            Then, wait for our customer support team to get back to you and cooperate with them to resolve your query effectively.
          </p>
        </section>

        {/* If Interacted on Fake/Unofficial Platforms */}
        <section id="fake-platforms" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">If Interacted on Fake/Unofficial Platforms (Social Media/App)</h2>
          <div className="space-y-4 text-lg">
            <p>
              If you believe you have engaged with a scammer on a fake or unofficial platform, follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>File a Complaint at Your Local Police Station:</strong> Visit your nearest police station and file an official complaint.
                Bring copies of emails, screenshots, and bank statements as evidence.
              </li>
              <li>
                <strong>Visit the Cyber Crime Website:</strong> Go to{" "}
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  cybercrime.gov.in
                </a>. Log in or register, choose “Report Other Cyber Crimes” then “Report Financial Fraud,” fill in your details,
                attach evidence, and submit your complaint.
              </li>
            </ol>
          </div>
        </section>

        {/* Legal Measures */}
        <section id="legal-measures" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Legal Measures Against Misuse</h2>
          <p className="text-lg">
            AllChain is dedicated to protecting its brand and users. Recently, the Hon’ble High Court of Delhi awarded an interim
            injunction against individuals misusing the AllChain name and logo. Unauthorized use of our name and logo may cause
            “irreparable loss and injury” to AllChain.
          </p>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
          <p className="text-lg">
            Your safety is our top priority. Remain vigilant and cautious of fraudulent schemes.
            By following these guidelines and reporting suspicious activities promptly, you can protect your investments and personal information.
            Stay safe and informed!
          </p>
        </section>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <a href="#top" className="text-blue-600 underline text-lg">
            Back to Top
          </a>
        </div>
      </div>
    </div>
  );
}
