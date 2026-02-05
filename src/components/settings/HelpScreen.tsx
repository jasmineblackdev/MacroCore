import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, FileText, ExternalLink } from "lucide-react";

interface HelpScreenProps {
  onBack: () => void;
}

const helpItems = [
  {
    icon: MessageCircle,
    label: "FAQs",
    description: "Find answers to common questions",
    action: "View FAQs",
  },
  {
    icon: Mail,
    label: "Contact Support",
    description: "Get help from our team",
    action: "Send Email",
  },
  {
    icon: FileText,
    label: "Terms of Service",
    description: "Read our terms and conditions",
    action: "View",
  },
  {
    icon: FileText,
    label: "Privacy Policy",
    description: "Learn how we protect your data",
    action: "View",
  },
];

const faqs = [
  {
    question: "How are my macros calculated?",
    answer: "Your macros are calculated based on your weight, height, age, activity level, and goals using proven nutrition science formulas.",
  },
  {
    question: "Can I change my goal later?",
    answer: "Yes! You can update your goal anytime from your profile settings. Your macros will be recalculated automatically.",
  },
  {
    question: "How often should I log my weight?",
    answer: "We recommend logging your weight daily, preferably at the same time each morning for the most accurate trends.",
  },
];

export const HelpScreen = ({ onBack }: HelpScreenProps) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-background z-50 overflow-y-auto"
    >
      <header className="sticky top-0 bg-background flex items-center gap-3 px-4 py-4 h-16 border-b border-border/30">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Help & Support</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Links */}
        <div className="space-y-2">
          {helpItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border/30 hover:bg-accent transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card border border-border/30"
              >
                <p className="font-medium text-foreground mb-2">{faq.question}</p>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">MacroCore v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Made with 💙 for your health</p>
        </div>
      </div>
    </motion.div>
  );
};
