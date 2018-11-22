<?php
/**
 * Template used for generating single answer item.
 *
 * @author     Rahul Aryan <support@anspress.io>
 * @link       https://anspress.io/anspress
 * @package    AnsPress
 * @subpackage Templates
 * @since      4.2.0
 */

namespace AnsPress;

?>
<div id="post-<?php answer_id(); ?>" class="<?php post_classes(); ?>" apid="<?php answer_id(); ?>" ap="answer">
	<div class="ap-content ap-display-flex" itemprop="suggestedAnswer<?php echo ap_is_selected() ? ' acceptedAnswer' : ''; ?>" itemscope itemtype="https://schema.org/Answer">

		<a class="ap-avatar-col ap-content-col" href="<?php ap_profile_link(); ?>">
			<?php ap_author_avatar( ap_opt( 'avatar_size_qanswer' ) ); ?>
		</a>

		<div class="ap-cell ap-content-col">
			<div class="ap-cell-inner">
				<div class="ap-q-metas">
					<?php echo ap_user_display_name( [ 'html' => true ] ); ?>
					<a href="<?php the_permalink(); ?>" class="ap-posted">
						<time itemprop="datePublished" datetime="<?php echo ap_get_time( get_the_ID(), 'c' ); ?>">
							<?php
							printf(
								__( 'Posted %s', 'anspress-question-answer' ),
								ap_human_time( ap_get_time( get_the_ID(), 'U' ) )
							);
								?>
						</time>
					</a>
					<span class="ap-comments-count">
						<?php comment_number(); ?>
					</span>
				</div>

				<div class="ap-q-inner">
					<?php
					/**
					 * Action triggered before answer content.
					 *
					 * @since   3.0.0
					 */
					do_action( 'ap_before_answer_content' );
					?>

					<div class="ap-answer-content ap-q-content" itemprop="text" ap-content>
						<?php answer_content(); ?>
					</div>

					<?php
					/**
					 * Action triggered after answer content.
					 *
					 * @since   3.0.0
					 */
					do_action( 'ap_after_answer_content' );
					?>

				</div>

				<div class="ap-post-footer ap-display-flex align-item-center">
					<?php do_action( 'ap_answer_footer' ); ?>
				</div>

			</div>
			<?php comments(); ?>
		</div>

		<div class="ap-single-vote ap-content-col">
			<?php vote_buttons(); ?>
		</div>

	</div>
</div>
