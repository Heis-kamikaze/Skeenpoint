const Footer = () => {
  return (
    <>
      <div className="flex flex-col py-2 font-roboto-con">
        <div className="grid grid-cols-3 mb-2 px-2 border-t-2">
          <div className="w-fit">
            <div className="font-bold text-sm md:text-2xl">Company</div>
            <br />

            <ul className='text-xs md:text-xl'>
              <a href="/">
                <li>Home</li>
              </a>
              <a href="/about">
                <li>About</li>
              </a>
              <a href="/contact">
                <li>Contact Us</li>
              </a>
            </ul>
          </div>

          <div className="w-fit">
            <div className="font-bold text-sm md:text-2xl">Contact</div>
            <br />
            <ul className='text-xs md:text-xl'>
              <li>Retail Stores</li>
              <li>09032287409</li>
              <a href="">
                <li>skeenpoint@gmail.com</li>
              </a>
            </ul>
          </div>
          <div className="w-fit">
            <div className="font-bold text-sm md:text-2xl">Address</div>
            <br />
            <ul className='text-xs md:text-xl'>
              <li>A3 Victory Plaza</li>
              <li>Kaduna 1</li>
              <li>Plaza Trade Fair</li>
            </ul>
          </div>
        </div>
        <div className="bg-black">
          <div className="flex justify-between items-center p-4">
            <div>
              <p className="text-white">© 2024</p>
            </div>
            <div>
              <p className="text-white">
                Made with ❤️ by
                <a href="" className="text-white hover:text-gray-400">
                  <span className="font-bold"> Gerrard</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
