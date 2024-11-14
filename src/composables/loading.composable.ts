import {ElLoading} from "element-plus";

const loadingComposable = () => {
    let loading: any = null;

    const startLoading = (text: string = 'Loading...') => {
        loading = ElLoading.service({
            lock: true,
            text: text,
            background: 'rgba(0, 0, 0, 0.7)',
        })
    };

    const stopLoading = () => {
        setTimeout(() => {
            loading.close()
        }, 2000)
    };

    return {loading, startLoading, stopLoading};
}

function useLoading() {
    return loadingComposable();
}

export {useLoading};