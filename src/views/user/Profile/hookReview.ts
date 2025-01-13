import { ref } from "vue";
import {
  getReviews,
  deleteReview,
  createReview,
  updateReview,
  getByOrder,
} from "@/apis/review";
import type { ReviewForm } from "@/types/apis/review";

export function useReviewHook() {
  const reviews = ref([]);
  const review = ref();
  const loading = ref(false);

  async function onGetReviews(id: string) {
    loading.value = true;

    const { data } = await getReviews(id);
    reviews.value = data;
    loading.value = false;
  }

  async function onGetByOrder(id: string) {
    loading.value = true;
  
    const result = await getByOrder(id); // Đợi Promise giải quyết
    review.value = result.data;          // Truy cập vào `data`
    loading.value = false;
  }
  

  async function onUpdateReview(data: ReviewForm) {
    const result = await updateReview(data);
    return result;
  }

  async function onDeleteReview(id: string) {
    const result = await deleteReview(id);
    return result;
  }

  async function onCreateReview(data: ReviewForm) {
    const result = await createReview(data);
    return result;
  }

  return {
    onGetReviews,
    onGetByOrder,
    onCreateReview,
    onUpdateReview,
    onDeleteReview,
    loading,
    reviews,
    review,
  };
}
