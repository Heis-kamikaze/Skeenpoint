const Homepage = () => {
  return (
    <>
      <div className="pl-3 mb-5 bg-b1-200 flex">

        <div className="text-left mt-2 flex flex-col justify-around">

          <p className="text-xs md:text-xl font-extrabold">
            Welcome to Skeenpoint Family
          </p>

          <p className="font-extrabold text-xl md:text-3xl text-wrap">
            Glow Beyond Limits with Skeenpoint Oil
          </p>

          <p className="text-xs md:text-xl text-wrap">
            Our products are crafted with carefully selected ingredients to
            nourish, hydrate and transform your skin. Join us on a journey to
            healthier and glowing skin.
          </p>

          <button className="bg-rust-100 text-white text-xs md:text-xl text-center font-light px-4 py-2 rounded-md md:rounded-lg mt-2 md:w-fit">
            Shop Now
          </button>
        </div>

        <div>
          <img src="./images/fem.png" alt="" />
        </div>

      </div>

      <div className="flex flex-col justify-center items-center p-4">

        <div className="mb-3">
          <img src="./images/3fem.png" alt="" className="" />
        </div>

        <div className="text-center">

          <p className="text-3xl font-extrabold mb-2">
            Glowing skin is a result of proper skincare
          </p>

          <p className="text-sm md:text-xl mb-2">
            At Skeenpoint, we believe that beauty goes beyond skin deep. Our journey began with a passion for skincare rooted in the principles of purity, science and sustainability. Explore our range of skincare essentials and embrace a skicare routine that celebrates your unique beauty.
          </p>

          <button className="bg-rust-100 text-white text-xs md:text-xl text-center font-light px-4 py-2 rounded-md md:rounded-lg mt-2 md:w-fit sm:w-fit">
            Shop Now
          </button>

        </div>

      </div>

      <div className="mx-5">
        <div className="flex justify-between items-center">
          <p className="text-lg font-extrabold"> 
            Featured Product
          </p>
          <div className="flex justify-between text-sm">
            <div className="px-1">
              All
            </div>
            <div className="px-1">
              Facial
            </div>
            <div className="px-1">
              Body
            </div>
          </div>
        </div>

        <div>

        </div>
      </div>

      <div></div>
      <div></div>
      <div className="mx-4 py-5 flex justify-center text-center rounded-lg bg-b1-100">
        <p className="text-xl md:text-3xl font-bold text-white">
          ...Where skin meets perfection
        </p>
      </div>
    </>
  );
};

export default Homepage;
