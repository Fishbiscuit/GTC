import { BigInt } from "@graphprotocol/graph-ts"
import {
  GTC,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  GTCDistChanged,
  MinterChanged,
  Transfer
} from "../generated/GTC/GTC"
// imports the schema defined prior
import { Delegate } from "../generated/schema"

// ingests the event when a new delegatee is made
export function handleDelegateChanged(event: DelegateChanged): void {
  let id = event.params.fromDelegate.toHex()
  let delegate = Delegate.load(id)
  if (delegate == null){
    delegate = new Delegate(id)
	delegate.delegatee = event.params.toDelegate
  }
	delegate.delegatee = event.params.toDelegate
	delegate.save()
}

// ingests the event when the votes a delegate has is changed
export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let id = event.params.delegate.toHex()
  let delegate = Delegate.load(id)
  if (delegate == null){
    delegate = new Delegate(id)
	delegate.delegatedAmount = event.params.previousBalance
  }
	delegate.delegatedAmount = event.params.newBalance
	delegate.save()
}

// Unused events for future work
// export function handleApproval(event: Approval): void {}

// export function handleGTCDistChanged(event: GTCDistChanged): void {}

//export function handleMinterChanged(event: MinterChanged): void {}

// export function handleTransfer(event: Transfer): void {}
