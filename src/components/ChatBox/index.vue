<template>
  <div v-if="isChatVisible" class="chat-box">
    <div
      class="chat-header flex justify-between items-center px-3 py-1 bg-blue-500 text-white rounded-t-lg shadow-md"
    >
      <div class="status flex flex-col">
        <span class="text-lg font-semibold">
          Sơn Tùng
        </span>
        <div class="flex flex-row items-center">
          <div
            :class="userStatus === 'online' ? 'bg-green-500' : 'bg-gray-500'"
            class="status-dot w-2 h-2 rounded-full mr-2"
          ></div>
          <span
            :class="
              userStatus === 'online' ? 'text-green-500' : 'text-gray-500'
            "
            style="font-size: 12px"
          >
            {{ userStatus === "online" ? "Online" : "Offline" }}
          </span>
        </div>
      </div>

      <!-- Nút Gọi điện -->
       <div>
        <el-button
        circle
        @click="makeCall"
        size="small"
        :class="callButtonClass"
        class="transition-colors duration-300"
      >
        <el-icon><Phone /></el-icon>
        <!-- Icon gọi điện -->
      </el-button>

      <!-- Nút đóng chat -->
      <el-button
        circle
        @click="closeChat"
        size="small"
        class="bg-transparent text-white hover:bg-white hover:text-blue-500 transition-colors duration-300"
      >
        <el-icon><Close /></el-icon>
      </el-button>

       </div>
      
    </div>

    <div class="chat-messages flex-1 p-4 overflow-y-auto space-y-3" ref="chatMessages">
      <div
        v-for="(message, index) in conversation.messages"
        :key="index"
        :class="
          message.senderId === conversation.user1.id
            ? 'flex justify-end max-w-2/3'
            : 'flex justify-start max-w-2/3'
        "
      >
        <div
          :class="
            message.senderId === conversation.user1.id
              ? 'bg-blue-500 text-white'
              : 'bg-red-400 text-white'
          "
          class="message-item p-2 rounded-lg max-w-[220px] w-fit shadow-sm text-wrap"
        >
          <p class="text-sm">{{ message.text }}</p>
          <span class="text-xs text-black">{{
            formatTimestamp(message.timestamp)
          }}</span>
        </div>
      </div>
    </div>

    <div
      class="chat-input p-3 flex items-center space-x-2 bg-gray-50 border-t border-gray-200 rounded-b-lg"
    >
      <el-input
        v-model="newMessage"
        placeholder="Type a message..."
        class="flex-1"
        size="large"
        @keyup.enter="sendMessage"
      />
      <el-button  :icon="Plus" circle />
      <el-button
        @click="sendMessage"
        size="small"
        link
        class="text-white transition-colors duration-300"
      >
        <Icon
          icon="majesticons:send-line"
          width="24"
          height="24"
          style="color: #31307e"
        />
      </el-button>
    </div>
  </div>

  <!-- Icon Chat Button -->
  <button
    @click="openChat"
    class="chat-toggle-btn fixed bottom-4 right-4 p-2 rounded-full shadow-lg  hover:bg-blue-50 transition-colors duration-300"
  >
    <Icon
      icon="uil:comment-message"
      width="48"
      height="48"
      style="color: #201dcd"
    />
  </button>
</template>

<script setup lang="ts">
import { ref, computed, reactive, nextTick, onMounted, onBeforeMount, watch } from "vue";
import { ElButton, ElInput, ElIcon } from "element-plus";
import { Icon } from "@iconify/vue";
import { Phone, Close, Plus } from "@element-plus/icons-vue"; // Import các icon cần thiết

const chatMessages = ref<HTMLElement | null>(null);
const isChatVisible = ref(false);

// Dữ liệu mẫu cho một cuộc trò chuyện
const conversation = reactive({
  id: 12345,
  user1: {
    id: 1,
    name: "John Doe",
    avatar: "https://example.com/john-avatar.jpg",
  },
  user2: {
    id: 2,
    name: "Jane Smith",
    avatar: "https://example.com/jane-avatar.jpg",
  },
  messages: [
  {
    senderId: 1,
    text: "Chào, ngày mai bạn rảnh không?",
    timestamp: "2024-11-19T08:30:00Z",
  },
  {
    senderId: 2,
    text: "Xin chào , tôi cần hỗ trợ với đơn hàng của mình.",
    timestamp: "2024-11-19T08:31:00Z",
  },
  {
    senderId: 1,
    text: "Chắc chắn rồi! Bạn có thể cung cấp số đơn hàng của mình không?",
    timestamp: "2024-11-19T08:32:00Z",
  },
  {
    senderId: 2,
    text: "Số đơn hàng của tôi là #987654.",
    timestamp: "2024-11-19T08:33:00Z",
  },
  {
    senderId: 1,
    text: "Tôi đã thấy vấn đề, tôi sẽ chuyển nó tới đội hỗ trợ.",
    timestamp: "2024-11-19T08:34:00Z",
  },
],
});

// Trạng thái online/offline
const userStatus = ref("online"); // "online" or "offline"

// Nút gọi điện - Tùy thuộc vào trạng thái online/offline
const callButtonClass = computed(() => {
  return userStatus.value === "online"
    ? "bg-blue-500 text-white"
    : "bg-gray-500 text-black";
});

// Mở chat
const openChat = () => {
  isChatVisible.value = true;
};
const newMessage = ref("");
// Đóng chat
const closeChat = () => {
  isChatVisible.value = false;
};
const scrollToBottom = () => {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
};


// Gửi tin nhắn
const sendMessage = () => {
  if (newMessage.value.trim()) {
    conversation.messages.push({
      text: newMessage.value,
      senderId: conversation.user1.id,
      timestamp: new Date().toISOString(),
    });
    newMessage.value = "";
    scrollToBottom();
  }
};

// Định dạng thời gian
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};

// Gọi điện
const makeCall = () => {
  if (userStatus.value === "online") {
    // Logic để gọi điện khi online
    console.log("Making call...");
  } else {
    // Thông báo người dùng đang offline
    console.log("Cannot make a call, user is offline");
  }
};


onMounted(() => {
  scrollToBottom();
});
watch(
  () => conversation.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.chat-box {
  position: fixed;
  bottom: 15px;
  right: 5px;
  width: 350px;
  height: 450px;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.chat-header {
  background-color: #3498db;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
}

.message-item {
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.chat-input {
  display: flex;
  align-items: center;
}

.chat-input .el-button {
  padding: 0.5rem;
}

.el-button:hover {
  background-color: #2980b9 !important;
}
</style>
