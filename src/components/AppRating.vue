<template>
	<div class="ratings">
		<span
			v-for="num in max"
			:key="num"
			:class="{ 'stared': num <= value  }"
			@click="$emit('onupdate', num)"
      v-html="num <= value ? '&#9733;' : '&#9734;'"
		></span>
	</div>
</template>

<script>
export default {
  emits: ['onupdate'],
	props: {
		value: Number,
		max: {
			type: Number,
			default: 5
		}
	},
}
</script>

<style scoped>
.ratings {
	margin-right: 10px;
}
.ratings span {
	color: #cecece;
	font-size: 32px;
  font-weight: bold;
	font-style: normal;
  cursor: pointer;
}
.ratings > .stared {
	color: #fbc634;
}
</style>
