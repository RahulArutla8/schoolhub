import { useForm } from 'react-hook-form';
import { useState } from 'react';

// AddSchool page component: form to add a new school
export default function AddSchool() {
  // React Hook Form setup for form validation and state
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  // State to show loading indicator while submitting
  const [submitting, setSubmitting] = useState(false);
  // State to show success or error message after submission
  const [message, setMessage] = useState(null);

  // Form submission handler
  const onSubmit = async (data) => {
    setSubmitting(true); // Show loading indicator
    setMessage(null);    // Clear previous messages
    try {
      // Prepare form data for API (including file upload)
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'image' && v && v.length > 0) {
          formData.append('image', v[0]); // Add image file
        } else {
          formData.append(k, v); // Add other fields
        }
      });

      // Send POST request to API to save school
      const res = await fetch('/api/schools', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to save');
      // Show success message and reset form
      setMessage({ type: 'success', text: 'School saved successfully!' });
      reset();
    } catch (err) {
      // Show error message if submission fails
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false); // Hide loading indicator
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page title */}
      <h1 className="text-2xl font-semibold mb-4">Add School</h1>
      {/* School form */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4 bg-white dark:bg-gray-950 p-4 md:p-6 rounded-2xl border"
      >
        {/* Form fields in a grid layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* School Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">School Name</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="e.g., Sunrise Public School"
              {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Min 3 characters' } })}
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>
          {/* City */}
          <div className="space-y-1">
            <label className="text-sm font-medium">City</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="Hyderabad"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
          </div>
          {/* State */}
          <div className="space-y-1">
            <label className="text-sm font-medium">State</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="Telangana"
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
          </div>
          {/* Address */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="Street, Area, PIN"
              {...register('address', { required: 'Address is required', minLength: { value: 5, message: 'Min 5 characters' } })}
            />
            {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
          </div>
          {/* Contact Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Contact Number</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="10-digit mobile"
              {...register('contact', {
                required: 'Contact is required',
                pattern: { value: /^\+?[0-9]{7,15}$/, message: 'Enter a valid phone number' }
              })}
            />
            {errors.contact && <p className="text-xs text-red-600">{errors.contact.message}</p>}
          </div>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input 
              className="w-full rounded-xl border p-2 bg-transparent" 
              placeholder="info@school.com"
              {...register('email_id', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
              })}
            />
            {errors.email_id && <p className="text-xs text-red-600">{errors.email_id.message}</p>}
          </div>
          {/* School Image */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">School Image</label>
            <input 
              type="file" 
              accept="image/*" 
              className="w-full rounded-xl border p-2 bg-transparent"
              {...register('image')} 
            />
            <p className="text-xs text-gray-500">JPEG/PNG up to ~3MB recommended.</p>
          </div>
        </div>

        {/* Submit button and message */}
        <div className="flex items-center gap-3">
          <button 
            disabled={submitting} 
            className="px-4 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Save School'}
          </button>
          {/* Success or error message */}
          {message && (
            <span className={message.type === 'success' ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
              {message.text}
            </span>
          )}
        </div>
      </form>
      {/* Responsive form info */}
      <p className="text-xs mt-3 text-gray-500">Form is fully responsive for phone and desktop screens.</p>
    </div>
  );
}
