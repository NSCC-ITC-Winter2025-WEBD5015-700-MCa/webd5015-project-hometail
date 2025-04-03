const HowItWorks = () => {
  return (
    <section
      id="HowItWorks"
      className="w-full flex justify-center pt-32 max-md:pt-16 text-black dark:text-white"
    >
      <div className="flex flex-col w-full max-lg:w-4/5">
        <div className="items-center flex flex-col gap-10">
          <h2 className="text-4xl font-bold dark-text light-text">
            <span className="text-blue-400">How</span> it works
          </h2>
          <p className="flex justify-center text-center w-3/5 max-lg:w-full text-lg dark-text light-text leading-relaxed">
            Discover how Hometail helps connect pets with loving families
            through a simple and easy adoption process.
          </p>
        </div>

        <div className="w-full flex text-center gap-16 pt-14 max-sm:flex-col max-sm:items-center text-black">
          {/* Card 1 */}
          <div className="flex flex-col gap-5 items-center w-1/3 max-md:w-full bg-white shadow-md rounded-lg p-6">
            <img
              src="/catDog.jpg"
              alt="Browse Pets"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold">Browse Available Pets</h2>
            <p className="text-lg">
              Explore a wide variety of pets waiting for their forever homes.
              Find the one that matches your preferences.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-5 items-center w-1/3 max-md:w-full bg-white shadow-md rounded-lg p-6">
            <img
              src="/connect.jpg"
              alt="Connect with Owners"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold">Connect with Pet Owners</h2>
            <p className="text-lg">
              Once you&apos;ve found a pet you like, reach out to the owner to
              ask questions and learn more about the pet&apos;s background.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-5 items-center w-1/3 max-md:w-full bg-white shadow-md rounded-lg p-6">
            <img
              src="/adoptpet.jpg"
              alt="Adopt Your New Pet"
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold">Adopt Your New Best Friend</h2>
            <p className="text-lg">
              Finalize the adoption process and bring your new furry friend
              home! Enjoy a lifetime of companionship and love.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
