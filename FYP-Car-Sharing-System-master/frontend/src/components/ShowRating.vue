<template>
  <div class="rating">
    <ul class="list">
      <li
        v-for="star in maxStars"
        :class="{ active: star <= stars }"
        :key="star.stars"
        class="star"
      >
        <i
          id="starIcon"
          :class="star <= stars ? 'fas fa-star' : 'far fa-star'"
        ></i>
      </li>
    </ul>
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">{{ stars }}</span>
      <span class="divider">/</span>
      <span class="score-max">{{ maxStars }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Rating",
  props: ["grade", "maxStars", "hasCounter"],
  data() {
    return {
      stars: this.grade
    };
  },
  methods: {
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
      }
      this.$emit("giveStar", this.stars);
    },
    getStar() {
      return this.stars;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/scss/rating.scss" lang="scss"></style>
<style scoped>
.rating {
  /* height: 30px; */
  padding: 10px;
  background-color: #ffffff;
  border: 0px;
}
.list {
  /* height: 50px; */
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.87);
}
.star {
  padding: 5px;
}
#starIcon {
  font-size: 22px;
}
</style>
