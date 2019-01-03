<template>
	<div class="article">
		<el-card v-if="articleDetail" class="no-border">
			<p class="article-content-title">{{ articleDetail.title }}</p>
			<div class="article-content-info-block">
				<span class="article-content-info-time" title="发布时间">
					<i class="el-icon-fa-calendar"></i>
					{{ articleDetail.create_time }}
				</span>
				<span class="article-content-info-author" title="作者">
					<i class="el-icon-fa-user"></i>
					{{ articleDetail.author }}
				</span>
				<span class="article-content-info-source" title="来源">
					<i class="el-icon-fa-info-circle"></i>
					{{ articleDetail.source }}
				</span>
			</div>

			<div class="article-content-content" v-html="articleDetail.content"></div>
		</el-card>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	props: {
		articleId: String
	},
	computed: {
		...mapState({
			articleDetail: state => state.app.articleDetail
		})
	},
	methods: {
		...mapActions(['getArticleDetail'])
	},
	created() {
		this.$store.commit('SET_LOADING_STATUS', true)
		this.getArticleDetail(this.articleId).finally(() => {
			this.$store.commit('SET_LOADING_STATUS', false)
		})
	},
	destroyed() {
		this.$store.commit('CLEAR_ARTICLE_DETAIL')
	}
}
</script>

<style>
.article {
    width: 1140px;
    margin: 20px auto;
}
.article-item-title {
	margin: 0;
	font-size: 20px;
	color: #333333;
	overflow: hidden;
	font-weight: 600;
}
.project-content-card-article-item {
	padding: 10px 15px;
	cursor: pointer;
	border-bottom: solid 1px #efefef;
	margin: 0px 10px;
}
.project-content-card-article-item:hover .article-item-title {
	color: #409eff;
}
.article-item-footer {
	display: block;
	height: 2em;
}
.article-item-footer-left {
	float: left;
	margin-top: 10px;
}
.article-item-footer-right {
	float: right;
	margin-top: 10px;
}
.article-item-time {
	display: inline-block;
	margin: 0px;
}
.article-item-source,
.article-item-author {
	display: inline-block;
	margin: 0px;
	text-align: left;
	font-size: 14px;
	line-height: 1.6;
	color: #666666;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	max-height: 45px;
}
.article-content-title {
	margin: 0;
	font-size: 24px;
	color: #333333;
	overflow: hidden;
	font-weight: 600;

	text-align: left;
}
.article-content-info-block {
	display: block;
	text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
}
.article-content-info-time,
.article-content-info-author,
.article-content-info-source {
	color: #666666;
	font-size: 14px;
	letter-spacing: -0.5px;
	margin-right: 10px;
}
.article-content-content {
	display: block;
	text-align: left;

	padding: 10px 0px;
}
.article-content-content p {
	margin: 0 0 10px;

	color: #333;
	font-size: 16px;
	line-height: 2em;
	text-align: justify;
}
</style>
