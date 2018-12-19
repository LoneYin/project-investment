<template>
	<el-card class="no-border">
		<el-row class="project-checkbox checkbox-round">
			<el-col :span="1" class="project-checkbox-label">偏好轮次</el-col>
			<el-col :span="22" :style="roundShowAll && 'max-height: 200px;'" class="project-checkbox-list">
				<el-row>
					<el-col :span="2" class="project-checkbox-item">
						<el-checkbox label="clear" @change="clearCheckBox('round')" v-model="roundClear">不限</el-checkbox>
					</el-col>
					<el-checkbox-group @change="handleCheckBoxChange('round')" v-model="roundSelectedList">
						<el-col
							:key="item.round_id"
							:span="2"
							class="project-checkbox-item"
							v-for="item in roundList"
						>
							<el-checkbox :label="item.round_id">{{item.name}}</el-checkbox>
						</el-col>
					</el-checkbox-group>
				</el-row>
				<div
					:class="roundShowAll ? 'dropDown-button' : 'dropDown-button arrow-down-rotated'"
					@click="roundShowAll = !roundShowAll"
				>
					<i class="el-icon-arrow-up"></i>
				</div>
			</el-col>
		</el-row>
		<el-row class="project-checkbox checkbox-round">
			<el-col :span="1" class="project-checkbox-label">行业</el-col>
			<el-col
				:span="22"
				:style="industryShowAll && 'max-height: 200px;'"
				class="project-checkbox-list"
			>
				<el-row>
					<el-col :span="2" class="project-checkbox-item">
						<el-checkbox label="clear" @change="clearCheckBox('industry')" v-model="industryClear">不限</el-checkbox>
					</el-col>
					<el-checkbox-group @change="handleCheckBoxChange('industry')" v-model="industrySelectedList">
						<el-col
							:key="item.industry_id"
							:span="2"
							class="project-checkbox-item"
							v-for="item in industryList"
						>
							<el-checkbox :label="item.industry_id">{{item.name}}</el-checkbox>
						</el-col>
					</el-checkbox-group>
				</el-row>
				<div
					:class="industryShowAll ? 'dropDown-button' : 'dropDown-button arrow-down-rotated'"
					@click="industryShowAll = !industryShowAll"
				>
					<i class="el-icon-arrow-up"></i>
				</div>
			</el-col>
		</el-row>
		<el-row class="project-checkbox checkbox-round">
			<el-col :span="1" class="project-checkbox-label">所在地</el-col>
			<el-col :span="22" :style="areaShowAll && 'max-height: 200px;'" class="project-checkbox-list">
				<el-row>
					<el-col :span="2" class="project-checkbox-item">
						<el-checkbox label="clear" @change="clearCheckBox('area')" v-model="areaClear">不限</el-checkbox>
					</el-col>
					<el-checkbox-group @change="handleCheckBoxChange('area')" v-model="areaSelectedList">
						<el-col
							:key="item.region_id"
							:span="2"
							class="project-checkbox-item"
							v-for="item in areaList"
						>
							<el-checkbox :label="item.region_id">{{item.name}}</el-checkbox>
						</el-col>
					</el-checkbox-group>
				</el-row>
				<div
					:class="areaShowAll ? 'dropDown-button' : 'dropDown-button arrow-down-rotated'"
					@click="areaShowAll = !areaShowAll"
				>
					<i class="el-icon-arrow-up"></i>
				</div>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
            roundClear: true,
            industryClear: true,
            areaClear: true,
			roundSelectedList: [],
			industrySelectedList: [],
			areaSelectedList: [],
			roundShowAll: false,
			industryShowAll: false,
			areaShowAll: false
		}
	},
	computed: {
		...mapState({
			roundList: state => state.project.roundList,
			industryList: state => state.project.industryList,
			areaList: state => state.project.areaList
		})
	},
	methods: {
		...mapActions(['getRoundList', 'getIndustryList', 'getAreaList']),
		handleCheckBoxChange(name) {
            switch (name) {
                case 'round':
                    if (this.roundSelectedList.length == 0) {
                        this.roundClear = true
                    } else {
                        this.roundClear = false
                    }
                    break
                case 'industry':
                    if (this.industrySelectedList.length == 0) {
                        this.industryClear = true
                    } else {
                        this.industryClear = false
                    }
                    break
                case 'area':
                    if (this.areaSelectedList.length == 0) {
                        this.areaClear = true
                    } else {
                        this.areaClear = false
                    }
                    break
                default:
                    break
            }
            this.$emit('refreshList', this.handleParams())
		},
		handleParams() {
			const params = {}
			if (this.roundSelectedList.length !== 0) {
				params.round_id = this.roundSelectedList
			}
			if (this.industrySelectedList.length !== 0) {
				params.industry_id = this.industrySelectedList
			}
			if (this.areaSelectedList.length !== 0) {
				params.region_id = this.areaSelectedList
			}
			return params
        },
        clearCheckBox(name) {
            switch (name) {
                case 'round':
                    this.roundSelectedList = []
                    this.roundClear = true
                    break
                case 'area':
                    this.areaSelectedList = []
                    this.areaClear = true
                    break
                case 'industry':
                    this.industrySelectedList = []
                    this.industryClear = true
                    break
                default:
                    break
            }
            this.$emit('refreshList', this.handleParams())
        }
	},
	created() {
		!this.roundList && this.getRoundList()
		!this.industryList && this.getIndustryList()
		!this.areaList && this.getAreaList()
	}
}
</script>

<style lang="less">
.project-checkbox {
	margin-bottom: 15px;
}
.project-checkbox-label {
	font-size: 14px;
	font-weight: 700;
	text-align: left;
}
.project-checkbox-list {
	position: relative;
	margin-left: 20px;
	border-bottom: 1px dashed #e5e5e5;
	max-height: 34px;
	overflow: hidden;
	transition: max-height ease-in-out 0.3s;
}
.project-checkbox-item {
	text-align: left;
	margin-bottom: 15px;
}
.dropDown-button {
	position: absolute;
	right: 0;
	top: 0;
	transition: all ease-in-out 0.3s;
	cursor: pointer;
}
.arrow-down-rotated {
	transform: rotate(180deg);
}
</style>

