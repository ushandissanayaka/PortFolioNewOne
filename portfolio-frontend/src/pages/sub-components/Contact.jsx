import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Basic form validation
    const newErrors = {};
    if (!senderName) newErrors.senderName = "Your name is required.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!message) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Add this if your API requires credentials
        }
      );

      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900'>
      {/* Heading Section */}
      <div className='relative w-full text-center'>
        <h1 className='flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[10px] sm:tracking-[15px] mx-auto w-fit font-extrabold'>
          CONTACT
          <span className='text-tubeLight-effect font-extrabold'>ME</span>
        </h1>

        {/* Line below the heading */}
        <div className='absolute w-[90%] sm:w-[70%] md:w-[50%] h-1 left-1/2 transform -translate-x-1/2 top-15 sm:top-12 md:top-14 lg:top-16 bg-slate-200 dark:bg-gray-500'>
          {/* Dots on the left side */}
          <div className='absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>

          {/* Dots on the right side */}
          <div className='absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>

          {/* Moving black line */}
          <div
            className='absolute w-8 h-1 bg-blue-800 top-0 animate-move-line'
            style={{
              animation: 'moveLine 3s linear infinite',
            }}
          ></div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSendMessage} className='w-full max-w-md mt-8 flex flex-col gap-6 px-4 sm:px-0'>
        {/* Name Field */}
        <div className='flex flex-col gap-2'>
          <Label className="text-lg sm:text-xl">Your Name</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name"
            className='w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
          />
          {errors.senderName && (
            <p className="text-sm text-red-500 dark:text-red-400">{errors.senderName}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className='flex flex-col gap-2'>
          <Label className="text-lg sm:text-xl">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className='w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
          />
          {errors.subject && (
            <p className="text-sm text-red-500 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div className='flex flex-col gap-2'>
          <Label className="text-lg sm:text-xl">Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please include your email or phone number in the message so we can contact you...."
            className='w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
            rows={5}
          />
          {errors.message && (
            <p className="text-sm text-red-500 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button type="submit" className="w-full text-gray-600  sm:w-52" disabled={loading}>
            {loading ? "Sending..." : "SEND MESSAGE"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;