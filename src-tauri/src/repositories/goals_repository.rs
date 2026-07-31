use entity::goals::*;
use migration::Expr;
use uuid::Uuid;

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use sea_orm::{ActiveValue::Set, EntityTrait, ExprTrait, QueryFilter, QueryOrder, QuerySelect};
#[async_trait]
pub trait GoalsRepository: Send + Sync {
    async fn get_goals(&self, limit: u64, offset: u64) -> Result<Vec<Model>, AppError>;
    async fn get_goal_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError>;
    async fn update_goal_settings(&self, goal: Model) -> Result<Model, AppError>;
    async fn update_goal_amount(&self, amount: u32, r#type: GoalType) -> Result<(), AppError>;
    async fn create_goal(&self, goal: Model) -> Result<(), AppError>;
    async fn get_not_ended_goal(&self, r#type: GoalType) -> Result<Option<Model>, AppError>;
    async fn get_not_ended_goals(&self) -> Result<Vec<Model>, AppError>;
    async fn finish_goal(&self, id: Uuid) -> Result<(), AppError>;
}

#[async_trait]
impl GoalsRepository for DatabaseService {
    async fn finish_goal(&self, id: Uuid) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(id),
            ended: Set(true),
            ..ActiveModel::default()
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Finish goal error", e))?;
        Ok(())
    }
    async fn get_not_ended_goal(&self, r#type: GoalType) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Expr::col(Column::Ended).eq(false))
            .filter(Expr::col(Column::Type).eq(r#type))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get not ended goal error", e))
    }
    async fn get_not_ended_goals(&self) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .filter(Expr::col(Column::Ended).eq(false))
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get not ended goals error", e))
    }
    async fn update_goal_amount(&self, amount: u32, r#type: GoalType) -> Result<(), AppError> {
        Entity::update_many()
            .col_expr(
                Column::CurrentAmount,
                Expr::col(Column::CurrentAmount).add(amount),
            )
            .filter(Expr::col(Column::Ended).eq(false))
            .filter(Expr::col(Column::Type).eq(r#type))
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Update goal amount error", e))?;

        Ok(())
    }
    async fn get_goals(&self, limit: u64, offset: u64) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .order_by_desc(Column::StartDate)
            .limit(limit)
            .offset(offset)
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get goals error", e))
    }
    async fn get_goal_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get goal by id error", e))
    }
    async fn update_goal_settings(&self, goal: Model) -> Result<Model, AppError> {
        let updated_goal = Entity::update(ActiveModel {
            id: Set(goal.id),
            title: Set(goal.title),
            amount_raise: Set(goal.amount_raise),
            start_raising: Set(goal.start_raising),
            current_amount: Set(goal.current_amount),
            end_date: Set(goal.end_date),
            start_date: Set(goal.start_date),
            ended: Set(goal.ended),
            r#type: Set(goal.r#type),
            goal_amount_limits: Set(goal.goal_amount_limits),
            widget_background: Set(goal.widget_background),
            bar_height: Set(goal.bar_height),
            rounding_radius: Set(goal.rounding_radius),
            bar_stroke_thickness: Set(goal.bar_stroke_thickness),
            background_bar_color: Set(goal.background_bar_color),
            progress_bar_color: Set(goal.progress_bar_color),
            widget_background_color: Set(goal.widget_background_color),
            goal_title_type: Set(goal.goal_title_type),
            goal_progress_bar: Set(goal.goal_progress_bar),
            remaining_time: Set(goal.remaining_time),
            progress_bar_layout: Set(goal.progress_bar_layout),
            title_style: Set(goal.title_style),
            progress_style: Set(goal.progress_style),
            limits_style: Set(goal.limits_style),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update goal settings error", e))?;

        Ok(updated_goal)
    }
    async fn create_goal(&self, goal: Model) -> Result<(), AppError> {
        Entity::insert(ActiveModel {
            id: Set(goal.id),
            title: Set(goal.title),
            amount_raise: Set(goal.amount_raise),
            start_raising: Set(goal.start_raising),
            current_amount: Set(goal.current_amount),
            end_date: Set(goal.end_date),
            start_date: Set(goal.start_date),
            ended: Set(goal.ended),
            r#type: Set(goal.r#type),
            goal_amount_limits: Set(goal.goal_amount_limits),
            widget_background: Set(goal.widget_background),
            bar_height: Set(goal.bar_height),
            rounding_radius: Set(goal.rounding_radius),
            bar_stroke_thickness: Set(goal.bar_stroke_thickness),
            background_bar_color: Set(goal.background_bar_color),
            progress_bar_color: Set(goal.progress_bar_color),
            widget_background_color: Set(goal.widget_background_color),
            goal_title_type: Set(goal.goal_title_type),
            goal_progress_bar: Set(goal.goal_progress_bar),
            remaining_time: Set(goal.remaining_time),
            progress_bar_layout: Set(goal.progress_bar_layout),
            title_style: Set(goal.title_style),
            progress_style: Set(goal.progress_style),
            limits_style: Set(goal.limits_style),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Create goal error", e))?;

        Ok(())
    }
}
