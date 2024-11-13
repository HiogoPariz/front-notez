
export class TokenBucket {
    /** @type {number} */
	max
    /** @type {number} */
	refillIntervalSeconds

    /**
     * 
     * @param {number} max 
     * @param {number} refillIntervalSeconds 
     */
	constructor(max, refillIntervalSeconds) {
		this.max = max;
		this.refillIntervalSeconds = refillIntervalSeconds;
	}

	storage = new Map();

    /**
     * 
     * @param {*} key 
     * @param {number} cost 
     * @returns {boolean}
     */
	check(key, cost) {
		const bucket = this.storage.get(key) ?? null;
		if (bucket === null) {
			return true;
		}
		const now = Date.now();
		const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000));
		if (refill > 0) {
			return Math.min(bucket.count + refill, this.max) >= cost;
		}
		return bucket.count >= cost;
	}

    /**
     * 
     * @param {*} key 
     * @param {number} cost 
     * @returns {boolean}
     */
	consume(key, cost) {
		let bucket = this.storage.get(key) ?? null;
		const now = Date.now();
		if (bucket === null) {
			bucket = {
				count: this.max - cost,
				refilledAt: now
			};
			this.storage.set(key, bucket);
			return true;
		}
		const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000));
		if (refill > 0) {
			bucket.count = Math.min(bucket.count + refill, this.max);
			bucket.refilledAt = now;
		}
		if (bucket.count < cost) {
			this.storage.set(key, bucket);
			return false;
		}
		bucket.count -= cost;
		this.storage.set(key, bucket);
		return true;
	}
}