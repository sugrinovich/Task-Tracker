import { useSearchParams } from "react-router-dom";


// Модалка открыта, пока в URL есть её параметр (?task=... или ?new=...).
// Закрыть = убрать этот параметр, остальная часть адреса не меняется.
export function useCloseModal(param: string) {
    const [, setSearchParams] = useSearchParams();

    return () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete(param);
            return next;
        });
    };
}
