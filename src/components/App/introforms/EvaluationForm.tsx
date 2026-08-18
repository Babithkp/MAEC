import { useSetRecoilState } from "recoil";
import { evalutonForm } from "../../../store/context";
import { Button } from "../../ui/button";
import { ChangeEvent, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Backdrop, CircularProgress } from "@mui/material";
import { addEvalutions, getUserEvalutionById } from "../../../http/fetch";

interface FormValues {
  courseByCourse: number;
  certificate: number;
  transcript: number;
  language: string;
  translationOption: string;
  userId: string | null;
}


type TranslationOption = "German" | "Dutch" | "French" | "";

const translationPrices: Record<Exclude<TranslationOption, "">, number> = {
  German: 15,
  Dutch: 10,
  French: 10,
};

export default function EvaluationForm() {
  const setPage = useSetRecoilState(evalutonForm);
  const [translationOption, setTranslationOption] =
    useState<TranslationOption>("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const onlyEng = translationOption !== "";

  const translationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTranslationOption(event.target.value as TranslationOption);
  };

  const prevButtonHandler = () => {
    setPage({
      informaton: { timeline: true, page: true },
      evaluations: { timeline: false, page: false },
      education: { timeline: false, page: false },
      pay: { timeline: false, page: false },
    });
  };
  const nextButtonHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage({
      informaton: { timeline: true, page: false },
      evaluations: { timeline: true, page: false },
      education: { timeline: true, page: true },
      pay: { timeline: false, page: false },
    });
  };

  const { handleSubmit, setValue } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!onlyEng) {
      setFetchError("Please select any service you need");
      return;
    }
    setIsLoading(true);
    setFetchError(null);
    data.translationOption = translationOption;

    if (translationOption) {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        data.userId = userId;

        if (translationOption === "German") {
          data.certificate = 15;
        } else if (translationOption === "Dutch") {
          data.certificate = 10;
        } else if (translationOption === "French") {
          data.certificate = 10;
        }
        try {
          const response = await addEvalutions(data);
          if (response.data.message) {
            nextButtonHandler();
          }
        } catch (err) {
          setFetchError("Something went wrong, please try again");
          setTimeout(() => {
            setFetchError(null);
          }, 5000);
        }
      } else {
        window.location.href = "/get-started";
      }
    } else {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        data.userId = userId;
        data.certificate = 0;
        data.transcript = 0;
        try {
          const response = await addEvalutions(data);
          if (response.data.message) {
            nextButtonHandler();
          }
        } catch (err) {
          setFetchError("Something went wrong, please try again");
          setTimeout(() => {
            setFetchError(null);
          }, 5000);
        }
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        setIsLoading(true);
        const response = await getUserEvalutionById({ userId: userId });
        if (response.data.data) {
          const data = response.data.data;
          
          setValue("certificate", data.certificate);
          setValue("transcript", data.transcript);
          setValue("language", data.language);
          if (data.translationOption) {
            setTranslationOption(data.translationOption);
          } else if (data.language) {
            setTranslationOption("German");
          }
        }
      }
      setIsLoading(false);
    };
    fetch();
  }, [setValue]);

  return (
    <form
      className="px-10 max-md:px-2 flex flex-col gap-5 max-md:w-full w-[70%] md:border-l"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="flex flex-col gap-5 border-t ">
        <p className="py-5 font-bold">
          Translation Services
          <span className="text-red-500">*</span>
        </p>
        <p>
        Select the language you want your document translated into.
        </p>
        <div className="flex flex-col gap-5 ">
          <div className="flex items-center gap-5">
            <input
              id="tranGerman"
              type="radio"
              name="Translation"
              value="German"
              className="border-black radio radio-info"
              checked={translationOption === "German"}
              onChange={translationHandler}
            />
            <label htmlFor="tranGerman">Add German Translation</label>
          </div>
          <div className="flex items-center gap-5">
            <input
              id="tranDutch"
              type="radio"
              name="Translation"
              value="Dutch"
              className="border-black radio radio-info"
              checked={translationOption === "Dutch"}
              onChange={translationHandler}
            />
            <label htmlFor="tranDutch">Add Dutch Translation</label>
          </div>
          <div className="flex items-center gap-5">
            <input
              id="tranFrench"
              type="radio"
              name="Translation"
              value="French"
              className="border-black radio radio-info"
              checked={translationOption === "French"}
              onChange={translationHandler}
            />
            <label htmlFor="tranFrench">Add French Translation</label>
          </div>
          {onlyEng && (
            <div className="flex flex-col gap-5">
              <p>
                Translated documents will be delivered via email once complete.
              </p>
              <p className="font-bold">
                €{translationPrices[translationOption as Exclude<TranslationOption, "">]} per document
              </p>
              
            </div>
          )}

          <div className="flex flex-col gap-5 pt-5 mt-5">
            <p className="font-bold">
              Processing Times <span className="text-red-500">*</span>
            </p>

            <p>
              Document Translation:
              <span className="font-bold"> 3 Business Days.</span>
            </p>
          </div>
        </div>
      </div>
      {fetchError && (
        <p className="my-5 text-red-500 font-bold">{fetchError}</p>
      )}
      <div className="w-full justify-end items-center flex mt-5 gap-5">
        <Button
          variant={"outline"}
          className="border-primary font-bold rounded-full"
          onClick={prevButtonHandler}
          type="button"
        >
          Back
        </Button>
        <Button
          className="bg-primary  rounded-full py-6 "
          disabled={isLoading ? true : false}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Next"}
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
}
