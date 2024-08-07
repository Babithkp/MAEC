import { Button } from "../../../ui/button";
import blutCutLogo from "/blue_cut.svg";

export default function Experience() {
  return (
    <section className="h-[80vh]  mt-10 gap-10  flex justify-center flex-col items-center bg-[#f9fdff]">
      <img src={blutCutLogo} className="w-[30rem] max-md:w-[20rem]"/>
      <h5 className="text-4xl max-md:text-center font-bold">Evaluation with the ‘Experienced’</h5>
      <p className="text-center w-[50%] max-md:w-[90%]">
        To celebrate the thousands of lives changed over our 40 years in
        business, MAEC launched 3 day standard processing time after receipt and
        approval of your documents. This means you are 3 days closer to that
        school acceptance letter, job offer or visa approval.
      </p>
      <Button className="bg-[#2aaae0] rounded-full" onClick={() => (window.location.href = "get-started")}>Start Evaluation</Button>
    </section>
  );
}
