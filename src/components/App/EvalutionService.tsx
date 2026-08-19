import { Button } from "../ui/button";import MAEClogo from "/msac_small_logo.png";

export default function EvalutionService() {
  return (
    <main className="flex flex-col justify-center items-center">
      <section className="w-[90%] max-md:w-[100%] font-medium">
        <div className="p-5 flex flex-col gap-5">
          <h1 className="text-center text-4xl font-bold ">
            ITS Authentication Services.
          </h1>
          <p className="text-center">
            Get your official documents verified and authenticated.
          </p>
        </div>
        <div className="p-5 flex-col flex gap-5">
          <h2 className="text-3xl font-bold ">
            Documents that can be authenticated by ITS
          </h2>
          <p>
          Academic certificates, transcripts, employment letters, bank statements, birth certificates, professional credentials, etc.
          </p>
          
        </div>
      </section>

      <article className=" flex flex-col justify-center items-center w-full py-10 bg-[#f9fdff]">
        <div className="w-[60%] max-md:w-[90%] justify-center items-center gap-7 flex flex-col text-center">
          <img src={MAEClogo} alt="MAEC logo" className="w-[6rem]" />
          <h4 className="text-4xl font-bold text-black max-md:text-2xl">
            Need assistance?
          </h4>
          <p>
            Our customer support team members are available to answer your
            questions 24 hours a day via chat, phone and email!
          </p>
          <div className="gap-5 flex">
            <Button
              variant={"outline"}
              className="font-bold rounded-full border-primary"
              onClick={() => (window.location.href = "contactus")}
            >
              Contact Us
            </Button>
            <Button
              className="font-bold rounded-full bg-primary"
              onClick={() => (window.location.href = "get-started")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
