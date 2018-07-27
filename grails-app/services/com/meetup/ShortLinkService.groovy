package com.meetup

import grails.validation.ValidationException
import org.springframework.transaction.annotation.Transactional

@Transactional
class ShortLinkService extends AbstractService {

	def genStubLink(url) {
		try {
			String stub = ProofUtil.genProofCode(4, false, false)
			new ShortLink(stub: stub, skeleton: url).save()
			return stub
		} catch (ValidationException ex) {
			this.genStubLink(url)
		}
	}

	@Transactional(readOnly = true)
	def getSkeletonLink(stub) {
		return ShortLink.findByStub(stub)?.skeleton
	}

	def deleteByStub(stub) {
		ShortLink.findByStub(stub)?.delete()
	}

	def deleteBySkeleton(skeleton) {
		ShortLink.findBySkeleton(skeleton)?.delete()
	}

}
