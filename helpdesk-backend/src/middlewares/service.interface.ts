export interface IResultService<T = null> {
    status: {
        isSuccess: boolean;
        code: string;
        message: string;
        warnings?: string[];
    };
    data?: T;
}
