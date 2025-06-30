import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Send,
  Loader2,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Direct Supabase insert - no backend API needed
      const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            is_read: false,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully! 🎉",
        description: "Thanks for reaching out, I'll get back to you soon.",
        variant: "default",
      });

      form.reset();
      
      // Optional: Log success for debugging
      console.log("Message sent successfully:", result);

    } catch (error: any) {
      console.error("Contact form error:", error);
      
      toast({
        title: "Failed to send message ❌",
        description: error.message || "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:hello@prashant.dev";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917618078806";
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-muted/50 w-full">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wider uppercase">
              GET IN TOUCH
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-alegreya font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 relative inline-block bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-muted-foreground"
          >
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out and let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-xl p-8 h-full">
              <h4 className="font-poppins font-semibold text-2xl mb-6">
                Contact Information
              </h4>

              <div className="flex items-start mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-1">Email</h5>
                  <button
                    onClick={handleEmailClick}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    hello@prashant.dev
                  </button>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-1">Phone</h5>
                  <button
                    onClick={handlePhoneClick}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    +91 76180 78806
                  </button>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-medium mb-1">Location</h5>
                  <p className="text-muted-foreground">
                    Azamgarh, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <h4 className="font-poppins font-semibold text-xl mb-4">
                Connect With Me
              </h4>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSocialClick("GitHub", "https://github.com/prashantmaurya19")}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center social-icon hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </button>
                <button
                  onClick={() => handleSocialClick("LinkedIn", "https://linkedin.com/in/prashant-maurya-dev")}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center social-icon hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </button>
                <button
                  onClick={() => handleSocialClick("Twitter", "https://twitter.com/prashant_dev19")}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center social-icon hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={18} />
                </button>
                <button
                  onClick={() => handleSocialClick("Portfolio", "https://x247.site")}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center social-icon hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Portfolio Website"
                >
                  <Dribbble size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-xl p-8">
              <h4 className="font-poppins font-semibold text-2xl mb-6">
                Send Me a Message
              </h4>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="bg-muted border-muted focus-visible:ring-primary"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                              className="bg-muted border-muted focus-visible:ring-primary"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
                            {...field}
                            className="bg-muted border-muted focus-visible:ring-primary"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Hello, I'd like to discuss a potential project..."
                            rows={5}
                            {...field}
                            className="bg-muted border-muted focus-visible:ring-primary resize-none"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;