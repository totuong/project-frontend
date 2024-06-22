<template>
	<div class="authLayout">
		<div class="left">
			<h1 class="title"> CV<span class="hust">HUST</span> </h1>
			<div class="bg"></div>
			<div class="description">
				<h1 class="text-xl">Tìm kiếm việc làm</h1>
				<p>Phát triển bởi Nguyễn Vũ, Bách Khỉ, Tô Tường</p>
			</div>
		</div>
		<div class="right">
			<!-- <slot /> -->
			<router-view />
		</div>
	</div>
</template>

<script setup></script>

<style lang="css" scoped>
.authLayout {
	display: flex;
	width: 100vw;
	height: 100vh;
}
.left {
	flex: 1;
	height: 100%;
	background: linear-gradient(to bottom, #b3d9ff, #66a3ff);
	border-right: 1px solid #66a3ff;
	position: relative;
}
.right {
	flex: 2;
	overflow-y: auto;
}
.title {
	text-align: center;
	margin-top: 15%;
	font-size: 50px;
	font-weight: bold;
}
.bg {
	background-image: url(https://cdn3.iconfinder.com/data/icons/racism/500/yul781_7_volunteer_handshake_family_business_logo_hand_party-512.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	height: 200px;
	margin-top: 20%;
	scale: 1.6;
}
.hust {
	color: #ee1d1d;
	font-size: 40px;
}
.description {
	text-align: center;
	position: absolute;
	bottom: 10%;
	width: 100%;
}
.description h1 {
	color: white;
	font-size: 28px;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.description p {
	margin-top: 20px;
	font-size: 14px;
	color: #bdbdbd;
}
</style>
