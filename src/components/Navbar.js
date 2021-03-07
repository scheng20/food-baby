export default function NavBar() {
	return (
		<footer className = "footer-nav">
			<div className = "container nav-bar">
				<div className = "row text-center nav-row">
					<div className = "col-1">
						<i class="fas fa-search"></i>
					</div>
					<div className = "col-5">
						<a className = "nav-label" href="/search"> search </a>
					</div>
					<div className = "col-5" >
						<a className = "nav-label" href="/upload"> upload/camera </a>
					</div>
				</div>
			</div>
		</footer>
	);
}
