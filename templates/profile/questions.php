<?php
/**
 * Profile questions template.
 *
 * @license    https://www.gnu.org/licenses/gpl-2.0.txt GNU Public License
 * @author     Rahul Aryan <support@anspress.io>
 *
 * @link       https://anspress.io
 * @since      4.2.0
 * @package    AnsPress
 * @subpackage Templates
 */

namespace AnsPress\Template;

// Prevent direct access to file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use AnsPress\Addons\Profile;
$user_id = ap_get_displayed_user_id();

$order_by  = get_current_questions_sorting();
$filter_by = get_current_questions_filter();

$nav = Profile\nav_links();

// Query args.
$question_args = array(
	'ap_order_by'     => $order_by,
	'ap_filter_by'    => $filter_by,
	'pagination_base' => $nav['questions']['link'],
	'author'          => $user_id,
);
?>

<?php ap_get_template_part( 'questions-sort-filters' ); ?>

<?php if ( ap_get_questions( $question_args ) ) : ?>

	<div class="ap-questions">
		<?php
		/* Start the Loop */
		while ( ap_have_questions() ) :
			ap_the_question();
			ap_get_template_part( 'profile/loop-question' );

		endwhile;
		?>
	</div>

	<?php ap_get_template_part( 'pagination-questions' ); ?>

<?php else : ?>

	<div class="ap-feedback ap-feedback-questions">
		<div class="ap-display-flex align-item-center">
			<i class="ap-feedback-icon apicon-question ap-text-muted"></i>
			<div>
				<strong class="ap-feedback-title"><?php esc_attr_e( 'No published questions yet!', 'anspress-question-answer' ); ?></strong>
				<p class="mb-0 ap-feedback-msg">
					<?php esc_attr_e( 'This user have not posted any questions yet.', 'anspress-question-answer' ); ?>
				</p>
			</div>
		</div>
	</div>

<?php endif; ?>