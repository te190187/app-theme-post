import { Box, Button } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { NextPage } from "next";
import Image from "next/image";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

const UploadTest: NextPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <Box>
      <IconInput {...register("userIcon")} />
      <Button
        mt="md"
        onClick={handleSubmit(async (d) => {
          console.log(d);
        })}
      >
        POST
      </Button>
    </Box>
  );
};

export default UploadTest;

type Props = ComponentPropsWithoutRef<"input">;
const IconInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useMergedRef(ref, innerRef);

    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

    const handleClick = () => {
      innerRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = innerRef.current?.files?.[0];
      if (!file) {
        return;
      }

      setImageObjectUrl(URL.createObjectURL(file));

      onChange?.(e);
    };

    const handleOnLoad = () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };

    return (
      <Box>
        <Box bg="red.7" onClick={handleClick} w="min-content">
          <input
            ref={fileInputRef}
            type="file"
            name="iconFile"
            hidden
            onChange={handleChange}
            accept="image/*"
            {...props}
          />
          <Image
            src={imageObjectUrl ?? "/"}
            width={100}
            height={100}
            onLoad={handleOnLoad}
            alt="icon"
          />
        </Box>
      </Box>
    );
  }
);
