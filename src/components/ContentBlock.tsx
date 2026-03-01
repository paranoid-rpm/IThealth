import { motion } from 'framer-motion';

type BlockProps = {
  label: string;
  title: string;
  children: React.ReactNode;
};

export default function ContentBlock(props: BlockProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-8 md:p-10"
    >
      <div className="text-primary font-bold text-xs tracking-wider uppercase mb-3 border-l-4 border-primary pl-4">{props.label}</div>
      <h2 className="text-2xl md:text-3xl font-black mb-5">{props.title}</h2>
      <div className="text-sm md:text-base text-muted leading-relaxed">{props.children}</div>
    </motion.section>
  );
}
