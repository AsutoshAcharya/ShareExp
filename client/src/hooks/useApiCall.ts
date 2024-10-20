import { useMutation, MutateOptions } from "@tanstack/react-query";

interface Props extends MutateOptions<any, any, any, any> {
  fn: (data: any) => Promise<any>;
}

function useApiCall({ fn, ...rest }: Props) {
  return useMutation((data: any) => fn(data), {
    ...rest,
  });
}

export default useApiCall;
