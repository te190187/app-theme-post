import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Controller, useForm } from "react-hook-form";
import { RiEdit2Line } from "react-icons/ri";
import { ProfileFormData, profileFormSchema } from "../../share/schema";
import { AppTextarea } from "./AppTextarea";
import { AppTextInput } from "./AppTextInput";

type Props = {
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
  actoinText: string;
  defaultValues?: ProfileFormData;
  isSubmitting?: boolean;
};
export const UserProfileForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  actoinText,
  defaultValues = { name: "", profile: "" },
  isSubmitting,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues,
    resolver: zodResolver(profileFormSchema),
  });

  const [debouncedSubmitting] = useDebouncedValue(isSubmitting, 250);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing="md">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <AppTextInput
              required
              label="ユーザー名"
              error={errors.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="profile"
          render={({ field }) => (
            <AppTextarea
              label="自己紹介"
              error={errors.profile?.message}
              autosize
              minRows={4}
              {...field}
            />
          )}
        />
      </Stack>
      <Flex gap="sm" mt="lg">
        <Button
          type="submit"
          loading={debouncedSubmitting}
          leftIcon={<RiEdit2Line size={20} />}
          loaderProps={{ size: 20 }}
        >
          {actoinText}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={debouncedSubmitting}
        >
          キャンセル
        </Button>
      </Flex>
    </form>
  );
};
