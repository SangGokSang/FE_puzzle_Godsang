import { useMutation } from '@tanstack/react-query';
import { IApiError } from 'src/core/type/api-error';
import { MutationOptions } from 'src/core/type/react-query-types';
import { deleteDM } from '../api';
import { DeleteMessageRequset } from '../types';
import { Puzzles } from 'src/module/puzzles';

export const useDeleteMessage = (options: MutationOptions<Puzzles, IApiError, DeleteMessageRequset> = {}) => {
  return useMutation<Puzzles, IApiError, DeleteMessageRequset>(
    (request: DeleteMessageRequset) => deleteDM(request),
    options,
  );
};
