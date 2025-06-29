import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  Clock,
  Award,
  Trophy,
  Star,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { useRef } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  iconColor?: string;
  link?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Nov 2024",
    title: "Gadgets Fever Website Launch",
    description:
      "Launched my first tech news website using WordPress, focusing on the latest gadgets and technology trends.",
    icon: Calendar,
    iconColor: "text-primary",
    link: "https://gadgetsfever.com",
  },
  {
    date: "Dec 2024",
    title: "First Major Blog Publication",
    description:
      "Published comprehensive smartphone review that gained significant traction and established my writing credibility.",
    icon: Bookmark,
    iconColor: "text-secondary",
  },
  {
    date: "Jan 2025",
    title: "Edu Connect 247 Platform",
    description:
      "Developed an AI-powered educational platform for IIT Jodhpur students using modern web technologies.",
    icon: ExternalLink,
    iconColor: "text-primary",
    link: "https://educonnect247.com",
  },
  {
    date: "Feb 2025",
    title: "GrabHostDeals Affiliate Site",
    description:
      "Created a comprehensive hosting deals comparison website with advanced filtering and search capabilities.",
    icon: Star,
    iconColor: "text-secondary",
    link: "https://grabhostdeals.com",
  },
  {
    date: "Mar 2025",
    title: "Coupons Fever Project",
    description:
      "Built a WordPress coupon system and app (Coupons x 247) with live REST API integration for deals and categories.",
    icon: Clock,
    iconColor: "text-primary",
  },
  {
    date: "Apr & May 2025",
    title: "Hostinger Horizon Partnership",
    description:
      "Accepted into Hostinger's exclusive partner program, recognizing my expertise in web development and hosting solutions.",
    icon: Clock,
    iconColor: "text-secondary",
  },
  {
    date: "June 2025",
    title: "Advanced Portfolio Website Of Mine",
    description:
      "Built this modern portfolio using React, TypeScript, and cutting-edge web technologies with advanced animations.",
    icon: Award,
    iconColor: "text-primary",
  },
  {
    date: "Jun 2025",
    title: "App Contest Achievement",
    description:
      "Secured second position in Hostinger's international app development contest with an innovative web application.",
    icon: Trophy,
    iconColor: "text-primary",
  },
  {
    date: "Jun 2025",
    title: "Recall X Launched",
    description:
      "Released 'Recall X' – a futuristic AI-powered digital memory vault and productivity system using GPT-4 and Supabase.",
    icon: ExternalLink,
    iconColor: "text-secondary",
  },
  {
    date: "Jul 2025",
    title: "FitVibe AI Beta Released",
    description:
      "Launched a global AI-powered fitness and diet planner that creates personalized mood-based health routines.",
    icon: Calendar,
    iconColor: "text-primary",
  },
];

const TimelineItem = ({
  event,
  index,
  total,
}: {
  event: TimelineEvent;
  index: number;
  total: number;
}) => {
  const isLeft = index % 2 === 0;
  const Icon = event.icon || Calendar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`timeline-item ${isLeft ? "left" : "right"}`}
    >
      <motion.div
        className="timeline-content group"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="timeline-date flex items-center gap-2">
          <Icon className={`${event.iconColor || "text-primary"}`} size={14} />
          {event.date}
        </span>
        <h4 className="timeline-title">{event.title}</h4>
        <p className="timeline-description">{event.description}</p>

        {event.link && (
          <motion.a
            href={event.link}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:text-secondary transition-colors"
            whileHover={{ x: 5 }}
          >
            Learn more <ArrowRight size={12} />
          </motion.a>
        )}

        {/* Animated decoration */}
        <motion.div
          className="absolute bottom-2 right-2 w-16 h-16 opacity-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className={`w-full h-full rounded-full border-2 ${index % 2 === 0 ? "border-primary" : "border-secondary"} border-dashed`}
          ></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 relative overflow-hidden w-full"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-background/90 z-0" />

      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${i % 2 === 0 ? "bg-primary/10" : "bg-secondary/10"}`}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Portfolio Title Added */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wider uppercase">
              Projects Journey
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            Project Timeline
            <motion.span
              className="absolute -top-8 -right-8 text-secondary"
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Clock size={32} className="text-primary opacity-70" />
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            A chronological overview of my recent projects and achievements from
            November 2024 onwards.
          </motion.p>
        </div>

        <div className="timeline-container relative min-h-[800px] pb-10">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={index}
              event={event}
              index={index}
              total={timelineEvents.length}
            />
          ))}
        </div>

        {/* SEO-optimized content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center max-w-2xl mx-auto bg-card/20 backdrop-blur-sm p-4 rounded-lg border border-primary/10"
        >
          <h3 className="text-sm font-medium text-secondary mb-2">
            Professional Web Developer Journey
          </h3>
          <p className="text-xs text-muted-foreground">
            Tracking my growth as a web developer since November 2024, from
            launching WordPress sites to winning app contests. Explore my
            journey through various tech projects and achievements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
