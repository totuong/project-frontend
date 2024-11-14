<template>
    <div>
      <!-- Messenger Popover with Search -->
      <el-popover
        v-model:visible="isMessengerVisible"
        width="400"
        trigger="click"
        placement="bottom-end"
      >
        <template #reference>
          <el-badge :value="unreadCount" class="item">
            <el-tooltip content="Tin nhắn" placement="bottom" effect="light">
              <el-button :icon="Message" circle />
            </el-tooltip>
          </el-badge>
        </template>
  
        <div class="messenger-content">
          <h3 class="text-lg font-bold text-center mb-4">Messages</h3>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for people..."
            class="w-full p-2 mb-4 border rounded"
          />
  
          <div v-if="filteredUsers.length > 0" class="messages-list">
            <div
              v-for="(user, index) in filteredUsers"
              :key="index"
              class="flex items-center p-2 border-b cursor-pointer hover:bg-gray-100"
              @click="openChat(user)"
            >
              <div class="flex flex-col flex-grow">
                <span class="font-semibold">{{ user.name }}</span>
                <span
                  class="text-sm text-gray-500 truncate"
                  :class="{ 'font-bold': !user.isRead }"
                >
                  {{ user.latestMessage }}
                </span>
              </div>
              <span
                v-if="!user.isRead"
                class="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2"
                >New</span
              >
            </div>
          </div>
          <div v-else class="no-messages text-center text-gray-500">
            No users found
          </div>
        </div>
      </el-popover>
  
      <!-- Chat Dialog -->
      <el-dialog
        v-model:visible="isChatDialogVisible"
        :title="selectedUser?.name || 'Chat'"
      >
        <div class="chat-content">
          <div
            v-for="(msg, index) in selectedUser?.messages"
            :key="index"
            class="flex items-start mb-2"
          >
            <p
              :class="{
                'text-right ml-auto': msg.fromUser,
                'text-left': !msg.fromUser,
              }"
              class="max-w-xs p-2 rounded-lg bg-gray-200 text-sm"
            >
              {{ msg.text }}
            </p>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <input
            type="text"
            v-model="newMessage"
            placeholder="Type a message..."
            class="w-full p-2 border rounded"
          />
          <el-button type="primary" icon="Send" @click="sendMessage" />
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Message } from "@element-plus/icons-vue";
  import { computed, ref } from "vue";
  
  interface Message {
    text: string;
    fromUser: boolean;
  }
  
  interface User {
    name: string;
    latestMessage: string;
    isRead: boolean;
    messages: Message[];
  }
  
  const isMessengerVisible = ref(false);
  const isChatDialogVisible = ref(false);
  const searchQuery = ref("");
  const newMessage = ref("");
  
  const users = ref<User[]>([
    {
      name: "Alice",
      latestMessage: "Hey, how are you?",
      isRead: false,
      messages: [
        { text: "Hey, how are you?", fromUser: false },
        { text: "I'm good, thanks!", fromUser: true },
      ],
    },
    {
      name: "Bob",
      latestMessage: "Are you coming to the event?",
      isRead: true,
      messages: [
        { text: "Are you coming to the event?", fromUser: false },
        { text: "Yes, I'll be there!", fromUser: true },
      ],
    },
  ]);
  
  const selectedUser = ref<User | null>(null);
  
  // Computed property for unread message count
  const unreadCount = computed(() => {
    return users.value.filter((user) => !user.isRead).length;
  });
  
  const filteredUsers = computed(() => {
    return users.value.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  function openChat(user: User) {
    selectedUser.value = user;
    user.isRead = true;
    isChatDialogVisible.value = true;
  }
  
  function sendMessage() {
    if (newMessage.value.trim() && selectedUser.value) {
      selectedUser.value.messages.push({
        text: newMessage.value,
        fromUser: true,
      });
      newMessage.value = "";
    }
  }
  </script>
  
  <style scoped>
  .messenger-content {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .chat-content {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .no-messages {
    color: #888;
  }
  </style>
  