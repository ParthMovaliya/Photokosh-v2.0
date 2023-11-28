import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data: userData, status } = useSelector((state) => state.user);
    return (
        <div className='flex flex-col gap-4'>
            <span className='my-4 font-semibold text-lg'>Welcome, {userData.isAuthenticated ? `${userData.user.name}` : "User"}!</span>
            <div className=''>
                <div className="flex flex-col gap-2 border border-neutral-500 p-4 bg-blue-50 rounded-lg">
                    <b className='text-xl'>What is Photokosh?</b>
                    <p>Photokosh is a revolutionary photo organization system that harnesses the power of cutting-edge face recognition and detection technologies. Our platform intelligently analyzes your photos, identifying faces and creating personalized folders for each individual. Whether you're a photographer managing client portfolios or an individual managing your memories, Photokosh streamlines your photo collection for unparalleled accessibility.</p>
                </div>
            </div>
            <div className=" border border-neutral-500 bg-yellow-50 p-4 rounded-lg">
                <ol className='list-disc list-inside flex flex-col gap-1'>
                    <b className='text-xl'>Discover Your Photos Like Never Before with Photokosh</b>
                    <li>Personalized Viewing: Say goodbye to endless scrolling through a sea of photos. Photokosh's smart technology automatically organizes your images into individual folders, making it a breeze to find your moments with just a click.</li>
                    <li>Instant Access: Your memories are at your fingertips. Log in to Photokosh and dive into your exclusive gallery, where you'll find only your photos waiting to be relived and cherished.</li>
                    <li>Effortless Sharing: Share your special moments with ease. Photokosh lets you seamlessly send curated albums to friends and family, ensuring they get to enjoy the highlights of your journey.</li>
                    <li>Time-Saving Convenience: No more hunting for that elusive picture. Photokosh's intuitive interface saves you time by delivering your photos directly, ensuring you can focus on relishing the memories.</li>
                    <li>Privacy First: Your privacy matters. Photokosh guarantees the security of your memories. You have complete control over who gets to see your photos, ensuring that your moments remain yours alone.</li>
                    <li>Uninterrupted Joy: Experience your memories without distractions. Photokosh offers an ad-free environment, allowing you to immerse yourself fully in the moments that matter.</li>
                </ol>
                <p className='mt-2'>Explore the future of photo viewing with Photokosh. Your photos, thoughtfully organized for your delight. Start your journey today!</p>
            </div>

            <div className=" border border-neutral-500 bg-green-50 p-4 rounded-lg">
                <b className='text-xl'>Elevate Your Photography Workflow with Photokosh</b>
                <ul className='list-disc list-inside flex flex-col gap-2 my-2'>
                    <span>As a photographer, you understand the value of time and the significance of a well-organized portfolio. Joining Photokosh can transform the way you manage your clients' photos, enhancing both your efficiency and professionalism.</span>
                    <li> Time-Saving Automation: Photokosh's advanced face recognition technology automatically categorizes your clients' photos into individual folders. Say goodbye to hours spent manually sorting through images and embrace a streamlined workflow that lets you focus on what you do best – capturing moments.</li>
                    <li>Client Delight: Impress your clients with a personalized touch. With Photokosh, you can effortlessly present them with organized photo collections that reflect your attention to detail and commitment to their satisfaction.</li>
                    <li>Enhanced Accessibility: Photokosh ensures that your clients can easily navigate and view their photos in a user-friendly interface. No more confusion over file names or disorganized folders – Photokosh makes it simple for clients to enjoy their memories.
                    </li>
                    <li>Secure Collaboration: Photokosh prioritizes data security. Share photo collections securely with your clients, knowing that their privacy is protected at every step.</li>
                </ul>
                <p>Join the Photokosh community and unlock a new level of photography organization. Let technology work for you, so you can focus on creating memorable images that truly matter. Your clients deserve the best – offer them the organization and professionalism they'll appreciate with Photokosh.</p>
                <div className="my-5 flex justify-center items-center">
                    <Link to='/become-photographer' className='border bg-green-500 text-white font-bold border-neutral-300 py-2 px-4 rounded hover:shadow-xl hover:scale-105 duration-300 '>Become a Photographer</Link>
                </div>
            </div>
        </div>
    )
}

export default Home