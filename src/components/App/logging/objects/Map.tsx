import blueMap from "/mapwithbluebackgroung.jpg";
import logo from "/maec_full_logo.jpg"

export default function Map() {
  return (
    <section className="md:w-[40%] relative text-white ">
    <img
      src={blueMap}
      alt="map"
      className="w-full h-full object-cover blur-[2px]"
    />
    <div className="absolute max-md:top-[2rem] max-md:left-[-4rem] top-[7rem] px-24 flex flex-col gap-5">
      <img src={logo} alt="iee logo" className="w-[10rem] max-md:w-[8rem]" />
      <h4 className="text-3xl max-md:text-xl font-bold">
        Get your evaluation in 3 days
      </h4>
    </div>
  </section>
  )
}
