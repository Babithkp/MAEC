import NeedAssistance from "../com/NeedAssistance";
export default function Verification() {
  return (
    <main className="flex justify-center items-center flex-col">
      <section className="w-[90%] max-md:w-[100%] font-medium">
        <div className="p-5 flex flex-col gap-5">
          <h1 className="text-center text-4xl font-bold ">ITS Verification Services.</h1>
          <p className="text-center">
            Get your official documents verified and authenticated.
          </p>
        </div>
        <div className="p-5 flex-col flex gap-5">
          <h2 className="text-3xl font-bold">
            Documents that can be Verification by ITS</h2>

          <p>
          Academic certificates, transcripts, employment letters, bank statements, birth certificates, professional credentials, etc.
          </p>

        
        </div>
      </section>
      <NeedAssistance />
    </main>
  );
}
