/*
 * html structure - you would repeat the fold-wrapper div as many times as needed for said accordian
 * the fold-header is the visible 'clickable' part of the accordian to allow the user to open and close its fold
 *
 * to initialize accordian: new nxnw.accordian('.accordian', callback, params, {});
 * pass any options in the options array if necessary
 *
 * adjust any css timining needed in the accordian.css file
*/

<div class="accordian">
	<div class="fold-wrapper">
		<div class="fold-header">
		</div><!-- \.fold-header -->
		<div class="fold">
			<div class="fold-inner">
			</div><!-- \.fold-inner -->
		</div><!-- \.fold -->
	</div><!-- \.fold-wrapper -->
</div> <!-- \.accordian -->