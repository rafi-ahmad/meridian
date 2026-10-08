import { Link } from "react-router-dom";
import { AccordionItem, Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    q: "What is your shipping policy?",
    a: "We offer free standard shipping on all orders over $200. Orders typically arrive within 3–7 business days domestically, and 7–14 business days internationally.",
  },
  {
    q: "What is your returns policy?",
    a: "We accept returns within 30 days of delivery for unworn items with tags attached. Refunds are issued to your original payment method within 5–10 business days of receipt.",
  },
  {
    q: "How do I find my size?",
    a: "Each product page includes a size guide with detailed measurements. If you're between sizes, we generally recommend sizing up for outerwear and knitwear.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 38 countries. Duties and taxes are calculated at checkout so there are no surprises on delivery.",
  },
];

export default function Journal() {
  return (
    <div className="container-meridian py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">Customer Care</p>
        <h1 className="mb-6 text-4xl sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mb-12 text-charcoal/70">
          Can't find what you're looking for?{" "}
          <Link to="/" className="link-underline text-ink">
            Contact our team
          </Link>{" "}
          and we'll get back to you within one business day.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Accordion>
          {faqs.map((f) => (
            <AccordionItem key={f.q} title={f.q}>
              {f.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
