(function() {
	Scene = function() {

	};

	Scene.prototype = {
		setCamera: function(camera) {
			this.camera = camera;
		},
		setParticles: function(particles) {
			this.particles = particles;
		},
		setCtx: function(ctx) {
			this.ctx = ctx;
		},
		draw: function() {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			this.ctx.fillRect(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 5, 5);	//screen center
			this.ctx.fillStyle = 'rgba(255, 255, 0, 1)';
			this.ctx.fillRect(this.ctx.canvas.width / 2 + this.camera.look[0], this.ctx.canvas.height / 2 + this.camera.look[1], 5, 5);	//look at position

			for (var i = 0; i < this.particles.length; i++) {
				this.particles[i].draw(this.ctx, this.camera);
			}
		}
	};

})();