import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8">Lovas Energy Services</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true" 
            className="flex flex-col gap-4 max-w-md"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full p-2 border rounded text-black"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
} 