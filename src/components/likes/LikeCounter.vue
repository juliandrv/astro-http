<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props {
  postId: string;
}

const props = defineProps<Props>();
const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(
  likeCount,
  debounce(() => {
    fetch(`/api/posts/likes/${props.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: likeClicks.value }),
    });
    likeClicks.value = 0;
  }, 1000)
);

const getCurrentLikes = async () => {
  const resp = await fetch(`/api/posts/likes/${props.postId}`);
  if (!resp.ok) return;

  const data = await resp.json();
  likeCount.value = data.likes;
  isLoading.value = false;
};

const likePost = () => {
  likeClicks.value++;
  likeCount.value++;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random(),
    },
  });
};

onMounted(() => {
  getCurrentLikes();
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <button v-else-if="likeCount === 0" @click="likePost">
    Like this post
  </button>
  <button v-else @click="likePost">
    Likes
    <span>{{ likeCount }}</span>
  </button>
</template>

<style scoped>
div {
  text-align: center;
}

button {
  background-color: #5e51bc;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.4s;
  margin: 0 auto;
  display: block;
}

button:hover {
  background-color: #4a3f9a;
}
</style>
